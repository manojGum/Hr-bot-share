/*
// import './App.css';
// import { Button, Form } from 'react-bootstrap';
// import { useEffect, useState } from "react"
// import axios from 'axios';

// function App() {

//   const [text, setText] = useState("");
//   const [messages, setMessages] = useState([]);

//   function sendMessage(e) {
//     e.preventDefault();

//     console.log("text: ", text);

//     setMessages((prev) => {
//       return [{ sender: "user", text: text }, ...prev];
//     });

//     const dev = "http://localhost:5658"
//     const baseUrl = (window.location.hostname.split(":")[0] === "localhost") ? dev : "";
//     console.log(baseUrl)

//     axios.post(`${baseUrl}/talktochatbot`, {
//       text: text
//     })
//       .then((response) => {
//         console.log("response", response.data.text);

//         setMessages((prev) => {
//           return [{ sender: "bot", text: response.data.text }, ...prev];
//         });
//         e.target.reset();
//         setText("");

//       }).catch(error => {
//         console.log("error: ", error);

//         setMessages((prev) => {
//           return [{ sender: "bot", text: "dummy response from chatbot" }, ...prev,];
//         });
//         e.target.reset();
//         setText("");

//       })
//   }

//   return (
//     <div>

//       <Form onSubmit={sendMessage}>
//         <Form.Group
//           style={{
//             display: "flex",
//             justifyContent: "space-between"
//           }} className="mb-3" controlId="formBasicEmail">

//           <Form.Control
//             onChange={(e) => { setText(e.target.value) }}
//             type="text"
//             placeholder="Enter your message"
//           />
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form.Group>
//       </Form>

//       <br />
//       <br />
//       <br />

//       <div style={{ display: "flex", flexDirection: "column" }}>

//         {messages?.map((eachMessage, eachMessageIndex) => (
//           <div key={`${eachMessageIndex}-message`} style={{
//             display: "flex",
//             justifyContent: (eachMessage.sender === "user") ? "flex-end" : "flex-start"
//           }}>
//             <div>{eachMessage.text}</div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default App;
*/
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Send from "@mui/icons-material/Send";
import "./newApp.css";
import axios from "axios";

function App() {
  const [myMessages, setMyMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // scroller window
  const scrollToBottom = () => {
    let messageWindow = document.querySelector("#messageWindow");
    messageWindow.scroll(0, messageWindow.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [myMessages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log("newMessage", newMessage);
    // setMyMessages([...myMessages,newMessage])
    // setMyMessages([...myMessages,{text:newMessage,from:"user"}])
    setMyMessages((prev) => {
      return [...prev, { text: newMessage, from: "user" }];
    });
    let response = await axios.post(
      "http://localhost:5658/api/v1/bot/message",
      {
        query: newMessage,
      }
    );

    console.log(response?.data?.message?.text);
    //  setMyMessages([...myMessages,response?.data?.message?.text])
    // setMyMessages([...myMessages,{text:response?.data?.message?.text,from:"bot"}])
    setMyMessages((prev) => {
      return [...prev, { text: response?.data?.message?.text, from: "bot" }];
    });

    e.target.reset();
  };
  return (
    <Box>
      <div id="messageWindow" className="messageWindow">
        {/* <div className='leftBallon messageBallon'>
        this is a text message
      </div> */}
        {myMessages.map((eachMessage, key) => {
          if (eachMessage.from === "bot") {
            return (
              <div key={key} className="leftBallon messageBallon">
                <div>
                  <sapn>{eachMessage.text}</sapn>
                </div>
              </div>
            );
          } else {
            return (
              <div key={key} className="rightBallon">
                <div>
                 <sapn>{eachMessage.text}</sapn>
                </div>
              </div>
            );
          }
        })}
      </div>

      <form onSubmit={sendMessage}>
        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            marginBottom: "1%",
            display: "flex",
          }}
        >
          <TextField
            sx={{ width: "95%" }}
            id="outlined-basic"
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            placeholder="Type a new message"
            variant="outlined"
          />
          <Box>
            <IconButton aria-label="Send" size="large" type="submit">
              <Send fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default App;
