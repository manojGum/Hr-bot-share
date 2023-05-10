// localauthentication 
const { Client, LocalAuth } = require('whatsapp-web.js');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
// const projectId = '<your-dialogflow-project-id>';
const sessionId = 'whatsapp-bot-session';
const qrcode = require('qrcode-terminal');



const whatsappBotController = async (req,res)=>{

    const client = new Client();

// const client = new Client({
//     puppeteer:{
//         headless:false
//     },
//     authStrategy: new LocalAuth({
//         clientId:"YOUR_CLIENT_ID"
//     })
// });

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message',  async (message) => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }

    // console.log(`Incoming message from ${message.from}: ${message.body}`);
    
    // // Get the user's phone number
    // const userPhoneNumber = message.from.split('@')[0];
  
    // // Send the user's message to Dialogflow
    // const sessionClient = new dialogflow.SessionsClient();
    // const sessionPath = sessionClient.sessionPath("hr-bot-xula", sessionId + userPhoneNumber);
    // const request = {
    //   session: sessionPath,
    //   queryInput: {
    //     text: {
    //       text: message.body,
    //       languageCode: 'en-US'
    //     }
    //   }
    // };
    // const responses = await sessionClient.detectIntent(request);
  
    // // Respond to the user's message based on the Dialogflow response
    // const result = responses[0].queryResult;
    // const intentDisplayName = result.intent.displayName;
    // const botResponse = result.fulfillmentText;
    // await client.sendMessage(message.from, botResponse);
  });
  
  client.initialize();
}

module.exports = whatsappBotController