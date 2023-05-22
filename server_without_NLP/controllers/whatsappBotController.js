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
const dialogflow = require("dialogflow");
const uuid = require("uuid");
// const projectId = '<your-dialogflow-project-id>';
const sessionId = "whatsapp-bot-session";
const WhatsappMessage = require("../models/whatsappMessageModel");
const qrcode = require("qrcode-terminal");
const isMatch = require('../helper/isMatch')
// const fs = require('fs');
// const SESSION_FILE_PATH = './session.json';

// / Define the bot's behavior
function getJaccardSimilarity(str1, str2) {
  const set1 = new Set(str1.split(" "));
  const set2 = new Set(str2.split(" "));
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

const whatsappBotController = async (req, res) => {
  // Load the session data if it has been previously saved
  // let sessionData;
  // if(fs.existsSync(SESSION_FILE_PATH)) {
  //     sessionData = require(SESSION_FILE_PATH);
  // }

  // Use the saved values
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

  // const client = new Client({
  //   authStrategy: new LegacySessionAuth({
  //       session: sessionData
  //   })
  // })

  // const client = new Client({
  //     puppeteer:{
  //         headless:false
  //     },
  //     authStrategy: new LocalAuth({
  //         clientId:"YOUR_CLIENT_ID"
  //     })
  // });

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
    // if (message.body === "hi") {

    //     let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
    //     console.log(button)
    //     client.sendMessage(message.from, button);

    // }
    try {
      console.log(`Incoming message from ${message.from}: ${message.body}`);

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
            /*
  
            const downloadUrl = faq.response;
            const fileName = 'application/pdf'; 
            const chatId = message.form;
            const media = new MessageMedia('yes',downloadUrl,fileName);
            // const media =await MessageMedia.fromUrl(downloadUrl, { filename: fileName });
            console.log(media)
            await client.sendMessage(chatId, media);
        
            const responseMessage = 'Download link sent successfully!'; 
        
            await client.sendMessage(chatId, responseMessage)
  
            */

            //     const downloadUrl = faq.response; //  download link // https://internal.talash.net/inthub/public/pdfjs/web/viewer.php?file=https://internal.talash.net/accounts/uploads/policy_documents/Travel_Reimbursement_Procedure_v1.0_1476948644.pdf
            //     const fileName = 'company policy';
            //     const caption = 'Please CLICK HERE to get your document';
            //     const media = new MessageMedia('application/octet-stream', downloadUrl, fileName);

            //     const botResponse =`${caption}\n\n${downloadUrl}`

            //  console.log(`Bot message from ${message.to}: ${botResponse}`);
            //  await client.sendMessage(message.from, botResponse);

            const media = await MessageMedia.fromUrl(faq.response);
            // return message.getChat().then(chat => chat.sendMessage(media))
            const caption = "Please CLICK HERE to get your document";
            // const botResponse = `${caption}\n\n${media}`;
            // await client.sendMessage(message.from, caption);
            client.sendMessage(message.from, media, {
              caption: "meme",
            });
          } else if (isMatch(faq.question.toLocaleLowerCase(), "image", similarityThreshold)) {
            // const mimetype=true
            // const media = await new MessageMedia(mimetype,faq.response)
            // return message.getChat().then((chat)=> chat.sendMessage(media));
            // await client.sendMessage(message.from, media);
            const imageUrl = await MessageMedia.fromUrl(
              "https://sample-videos.com/img/Sample-jpg-image-100kb.jpg"
            )
            await client.sendMessage(message.from, imageUrl,{
              caption: "your image",
            });
          } else if (isMatch(faq.question.toLocaleLowerCase(), 'hi', similarityThreshold)) {
            // Respond with a welcome message and clickable options
            //   button = await new Buttons('Button',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
            //   console.log(button)
            //   // chatId= number.substring(1) + "@c.us"
            //   // client.sendMessage(chatId,button);
            //   // const options = [
            //   //   { title: 'Option 1', payload: 'option1' },
            //   //   { title: 'Option 2', payload: 'option2' },
            //   //   { title: 'Option 3', payload: 'option3' },
            //   // ];
            //   await client.sendMessage(message.from, 'Hello! Please select an option:');
            //  await client.sendMessage(message.from, button);
            //   const productsList = new List(
            //     "Amazing deal on these products",
            //     "View products",
            //     [
            //         {
            //             title: "Products list",
            //             rows: [
            //                 { id: "apple", title: "Apple" },
            //                 { id: "mango", title: "Mango" },
            //                 { id: "banana", title: "Banana" },
            //             ],
            //         },
            //     ],
            //     "Please select a product"
            // );

            //     const sendMessageData = await client.sendMessage(message.from, productsList); // send message
            //     console.log('msg sent now closing ', sendMessageData)


            // Check if the message is from the desired user or group

            // const buttons = [
            //   { id: 'button1', text: 'Button 1' },
            //   { id: 'button2', text: 'Button 2' },
            //   { id: 'button3', text: 'Button 3' }
            // ];

            // const content = { type: 'buttons', buttons };

            // // Send the message with buttons as a reply
            // await message.reply(content);
            // Other code to initialize and connect the client...
            
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

  // Save session values to the file upon successful auth
  // client.on('authenticated', (session) => {
  //   sessionData = session;
  //   fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
  //       if (err) {
  //           console.error(err);
  //       }
  //   });
  // });

  client.initialize();
};

module.exports = whatsappBotController;
