const messageController = async (req, res) => {
  try {
    const body = await req.body;
    const intentName = body.queryResult.intent.displayName;
    const params = body.queryResult.parameters;
    switch (intentName) {
      case "Apply for Job": {
        console.log("collected params", params);
        /*
        // const respo = body.fulfillmentText;
        */
        let responseText = "This reply came from webhook server";
        res.send({
          fulfillmentMessages: [
            {
              text: {
                text: responseText,
              },
            },
          ],
        });
        break;
      }
      case "Company Policies": {
        let responseText = `${body.fulfillmentText}, server.`;
        res.send({
          fulfillmentMessages: [
            {
              text: {
                text: [responseText],
              },
            },
          ],
        });
        break;
      }

      default:
        res.send({
          fulfillmentMessages: [
            {
              text: {
                text: ["sorry webhook dont know answer for this intent "],
              },
            },
          ],
        });
        break;
    }
/*
    // if(intentName==='Apply for Job'){
    //     console.log('collected params',params)
    //     let responseText =`${body.fulfillmentText},This reply came from webhook server`
    //     res.send({
    //       "fulfillmentMessages": [
    //         {
    //           "text": {
    //             "text": [
    //               responseText
    //             ]
    //           }
    //         }
    //       ]
    //     })
    // }else{
    //   res.send({
    //     "fulfillmentMessages": [
    //       {
    //         "text": {
    //           "text": [
    //             "sorry webhook dont know answer for this intent "
    //           ]
    //         }
    //       }
    //     ]
    //   })
    // }
    */
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "server error",
    });
  }
};

module.exports = messageController;

/*
// 
// const webhookRequest ={
//     "responseId": "response-id",
//     "session": "projects/project-id/agent/sessions/session-id",
//     "queryResult": {
//       "queryText": "End-user expression",
//       "parameters": {
//         "param-name": "param-value"
//       },
//       "allRequiredParamsPresent": true,
//       "fulfillmentText": "Response configured for matched intent",
//       "fulfillmentMessages": [
//         {
//           "text": {
//             "text": [
//               "Response configured for matched intent"
//             ]
//           }
//         }
//       ],
//       "outputContexts": [
//         {
//           "name": "projects/project-id/agent/sessions/session-id/contexts/context-name",
//           "lifespanCount": 5,
//           "parameters": {
//             "param-name": "param-value"
//           }
//         }
//       ],
//       "intent": {
//         "name": "projects/project-id/agent/intents/intent-id",
//         "displayName": "matched-intent-name"
//       },
//       "intentDetectionConfidence": 1,
//       "diagnosticInfo": {},
//       "languageCode": "en"
//     },
//     "originalDetectIntentRequest": {}
//   }
*/
