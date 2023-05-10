const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const messageRoutes = require("./routes/messageRoutes");

const app = express();

const API = process.env.Api_URL;
const PORT = process.env.PORT || 5658;

// model


// middleware
app.use(cors());
app.use(express.json());

// Routers
app.use(`${API}/bot`, messageRoutes);
app.get(`${API}/bot`, (req, res) => {
  res.send({
    message: "Hi Welcome to HR Assistance bot",
  });
});

/*
app.post(`${API}/bot/message`, async (req, res) => {
 

try{
  const sessionId = uuid.v4();
  const body=  await req.body
  console.log("dsfjsldj flksjf j",body.query)
  if(!body.query){
    res.status(400).send('required parameter missing. example request body:',{
      "query":"Hi"
    })
    return;
  }
  let save = await messageModel.create({
    query:body.query,
    from:"user"
  })

// console.log(save)
  // TODO : send query to dialogflow and get chatbot response
  // let response= await axios.post("https://dialogflow.googleapis.com/v2/session=projects/hr-bot-xula/agent/sessions/user153:detectIntent",{
  //   "queryInput": {
  //     "text": {
  //         "text": req.body,
  //         "languageCode": 'en-us'
  //     },
  //   }
  // })
  // console.log("response", data)
  // using dialog flow library
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath("hr-bot-xula", sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: body.query,
          // The language used by the client (en-US)
          languageCode: 'en',
        },
      },
    };
   
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    // console.log('Detected intent');
    console.log(responses)
    const result = responses[0].queryResult;
    // console.log(`  Query: ${responses}`);

    // console.log(`  Response: ${result.fulfillmentText}`);



  return res.send({
    message:{
      text:`${result.fulfillmentText}`
    }
  })

}catch(e){
  console.log(e)
  res.status(500).send({
    message:"server error"
  })
}
});
*/

//Databse connection

mongoose
  .connect(
    "mongodb+srv://ManojKumar:ManojKumar@cluster0.jir7wgl.mongodb.net/demo?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection is ready .....");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

// https://www.npmjs.com/package/ngrok/v/4.2.2#local-install
//https://www.udemy.com/course/chatbot-for-website-with-react-and-nodejs/
//https://blog.logrocket.com/building-chatbots-dialogflow-node-js-and-react/


// faq chat bot
// https://github.com/Akash52/dialogflow-chatbot-react/blob/master/chatbot.js
//GOOGLE_APPLICATION_CREDENTIALS="./hr-bot-xula-9e1aa8c01cd9.json"



//https://youtu.be/6FTfjSlieNU