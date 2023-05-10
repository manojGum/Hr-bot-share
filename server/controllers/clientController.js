const express = require("express");
const mongoose = require("mongoose");
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const ClientModel = require('../models/clientModel')
const clientController =async (req, res) =>{
 

    try{
      const sessionId = uuid.v4();
      const body=  await req.body
      if(!body.query){
        res.status(400).send('required parameter missing. example request body:',{
          "query":"Hi"
        })
        return;
      }
      let save = await ClientModel.create({
        query:body.query,
        from:"user"
      })
        const sessionClient = new dialogflow.SessionsClient();
        const sessionPath = sessionClient.sessionPath("hr-bot-xula", sessionId);
    
        const request = {
          session: sessionPath,
          queryInput: {
            text: {
              // The query to send to the dialogflow agent
              text: body.query,
              // The language used by the client (en-US)
              languageCode: 'en-Us',
            },
          },
        };
       
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        // console.log('Detected intent');
        // console.log(responses)
        const result = responses[0].queryResult;
        console.log(result)
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
    }

    module.exports = clientController;