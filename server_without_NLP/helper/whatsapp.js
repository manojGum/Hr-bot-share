// for (let i = 0; i < data.length; i++) {
//     const faq = data[i];
//     const similarity = getJaccardSimilarity(
//       userInput.toLowerCase(),
//       faq.question.toLowerCase()
//     );
//     if (similarity >= 0.4 && similarity > maxSimilarity) {
//       // maxSimilarity = similarity;
//       if (faq.question.toLowerCase() === "i need my details")if(isMatch(userMessage, 'hi', similarityThreshold)) {
//         let botR = await axios.get(`${faq.response}${userPhoneNumber}`);
//         if (botR) {
//           botResponse = await JSON.stringify(botR.data);
//           console.log(`Bot message from ${message.to}: ${botResponse}`);

//           await client.sendMessage(message.from, botResponse);
//         } else {
//           await client.sendMessage(message.from, "No user found");
//         }
//       } else if (
//         faq.question.toLocaleLowerCase() ===
//         "what is the company's work from home policy?"
//       ) {
//         /*

//         const downloadUrl = faq.response;
//         const fileName = 'application/pdf'; 
//         const chatId = message.form;
//         const media = new MessageMedia('yes',downloadUrl,fileName);
//         // const media =await MessageMedia.fromUrl(downloadUrl, { filename: fileName });
//         console.log(media)
//         await client.sendMessage(chatId, media);
    
//         const responseMessage = 'Download link sent successfully!'; 
    
//         await client.sendMessage(chatId, responseMessage)

//         */

//         //     const downloadUrl = faq.response; //  download link // https://internal.talash.net/inthub/public/pdfjs/web/viewer.php?file=https://internal.talash.net/accounts/uploads/policy_documents/Travel_Reimbursement_Procedure_v1.0_1476948644.pdf
//         //     const fileName = 'company policy';
//         //     const caption = 'Please CLICK HERE to get your document';
//         //     const media = new MessageMedia('application/octet-stream', downloadUrl, fileName);

//         //     const botResponse =`${caption}\n\n${downloadUrl}`

//         //  console.log(`Bot message from ${message.to}: ${botResponse}`);
//         //  await client.sendMessage(message.from, botResponse);

//         const media = await MessageMedia.fromUrl(faq.response);
//         // return message.getChat().then(chat => chat.sendMessage(media))
//         const caption = "Please CLICK HERE to get your document";
//         const botResponse = `${caption}\n\n${media}`;
//         await client.sendMessage(message.from, caption);
//         await client.sendMessage(message.from, media);
//       } else if (faq.question.toLocaleLowerCase() === "image") {
//         // const mimetype=true
//         // const media = await new MessageMedia(mimetype,faq.response)
//         // return message.getChat().then((chat)=> chat.sendMessage(media));
//         // await client.sendMessage(message.from, media);
//         const imageUrl = await MessageMedia.fromUrl(
//           "https://sample-videos.com/img/Sample-jpg-image-100kb.jpg"
//         ).then((media) => {
//           return media;
//         });
//         client.sendMessage(message.from, imageUrl);
//       } else {
//         botResponse = faq.response;
//         console.log(`Bot message from ${message.to}: ${botResponse}`);
//         await client.sendMessage(message.from, botResponse);
//       }
//       return;
//     }
//   }