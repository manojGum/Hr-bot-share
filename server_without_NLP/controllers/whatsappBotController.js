// localauthentication
const axios = require("axios");
const {
  Client,
  LocalAuth,
  MessageMedia,
  LegacySessionAuth,
  Buttons,
  List,
} = require("whatsapp-web.js");
const WhatsappMessage = require("../models/whatsappMessageModel");
const qrcode = require("qrcode-terminal");
const isMatch = require('../helper/isMatch')

// / Define the bot's behavior
function getJaccardSimilarity(str1, str2) {
  const set1 = new Set(str1.split(" "));
  const set2 = new Set(str2.split(" "));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

const whatsappBotController = async (req, res) => {
  // authentication 
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      handleSIGINT: false,
      headless:false,
      args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
      ] }
  });

  client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
  });
  // const myGroupName = "INT-HR-BOT";
  client.on("ready", () => {
    console.log("Client is ready!");
    
  });
  client.on("authenticated", () => {
    console.log("AUTHENTICATED");
  });

  client.on("message", async (message) => {
    console.log('message from', message.from)
    console.log(`Incoming message from ${message.from}: ${message.body}`);
    try {

      // Get the user's phone number
      const userPhoneNumber = message.from.split("@")[0];

      const userInput = message.body.toLocaleLowerCase();
      let botResponse = "";
      // find all Data to the database
      const data = await WhatsappMessage.find();
      // console.log(data)
      let maxSimilarity = 0;
      const similarityThreshold = 0.5;
      for (let i = 0; i < data.length; i++) {
        const faq = data[i];
        const similarity = getJaccardSimilarity(
          userInput.toLowerCase(),
          faq.question.toLowerCase()
        );
        if (similarity >= 0.4 && similarity > maxSimilarity) {
          // maxSimilarity = similarity;
          if (isMatch(faq.question.toLocaleLowerCase(), "i need my details", similarityThreshold)) {
            let botR = await axios.get(`${faq.response}${userPhoneNumber}`);
            console.log(botR)
            if (botR) {
              botResponse = await JSON.stringify(botR.data);
              console.log(`Bot message from ${message.to}:  ${botResponse}`);

              await client.sendMessage(message.from, `User Details: ${botResponse}`);
            } else {
              await client.sendMessage(message.from, "No user found");
            }
          } else if (isMatch(faq.question.toLocaleLowerCase(), "what is the company's work from home policy?", similarityThreshold)) {

            const media = await MessageMedia.fromUrl(faq.response);
            const caption = "Please CLICK HERE to get your document";
            client.sendMessage(message.from, media, {
              caption: "meme",
            });
          } else if (isMatch(faq.question.toLocaleLowerCase(), "image", similarityThreshold)) {
            const imageUrl = await MessageMedia.fromUrl(
              "https://sample-videos.com/img/Sample-jpg-image-100kb.jpg"
            )
            await client.sendMessage(message.from, imageUrl,{
              caption: "your image",
            });
          } else if (isMatch(faq.question.toLocaleLowerCase(), 'hi', similarityThreshold)) {
            let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
            console.log(button)
            client.sendMessage(message.from, button);

          }else if(isMatch(faq.question.toLocaleLowerCase(), 'list', similarityThreshold)){
            const productsList = new List(
              "Here's our list of products at 50% off",
              "View all products",
              [
                {
                  title: "Products list",
                  rows: [
                    { id: "!buttons", title:"!buttons" },
                    { id: "button", title: "button" },
                    { id: "!list", title: "list" },
                    { id: "mango", title: "manog" },
                    { id: "apple", title: "apple" },
                    { id: "banana", title: "banana" },
                    { id: "gra", title: "list" },
                  ],
                },
              ],
              "Please select a product"
            );
            console.log(message.from,productsList)
            await client.sendMessage(message.from, productsList);
          } else {
            botResponse = faq.response;
            console.log(`Bot message from else per ${message.to}: ${botResponse}`);
            await client.sendMessage(message.from, botResponse);
          }
          return;
        }
      }
      // else part
      client.sendMessage(
        message.from,
        "I am sorry, I did not understand your request. Please try again or contact our HR department for assistance."
      );

    } catch (error) {
      console.log(error)
    }

  });

  client.initialize();
};

module.exports = whatsappBotController;
