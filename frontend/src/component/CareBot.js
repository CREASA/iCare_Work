import React,{useState} from 'react';
//Material UI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';

// Returning a promise that resolves with a response message after a delay
const botResponse = (message) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = [
                "Hello, this is the CareBot.", //Created random reponses to test the UI
                "How can I help?",
                "I'm sorry, I don't understand."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            resolve(response);
        }, 1000);
    });
};

export function CareBotChat(){
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);

    // Handler function for the input change event
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // Handler function for the button click event
    const handleButtonClick = async () => {
        if (input) {
        // Adding the input message to the chat history
        setChat((prevChat) => [
            ...prevChat,
            { text: input, type: "sender" },
        ]);
        setInput("");
        document.getElementById("input-field").value = "";
        // Calling the demo function to send the message and get a response
        try{
            const response = await botResponse(input);
            setChat((prevChat) => [
                ...prevChat,
                { text: response, type: "receiver" },
            ]);
        }catch(error){
            console.error(error);
        }
        }
    };
    return (
        <div>
            <br></br>
            <br></br>
            Good Afternoon, user!
            <Box>
                <Box id="chat-box" >
                    {chat.map((message) => (
                        <div>
                        {(() => {
                          if(message.type==="receiver") { //Bot reponses (displayed on the left side)
                            return (
                                <div style={{'margin':'2px','textAlign':'left'}}>
                                    <p style={{'display':'inline-block','marginLeft':'20px','border':'2px solid black','borderRadius':'5px','padding':'10px'}}>
                                        {message.text}
                                    </p>
                                </div>
                            ) 
                          }else{  //Input message (displayed on the right side)
                            return (
                                <div style={{'margin':'2px','textAlign':'right'}}>
                                    <p style={{'display':'inline-block','marginRight':'20px','border':'2px solid black','borderRadius':'5px','padding':'10px'}}>
                                        {message.text}
                                    </p>
                                </div>
                            )
                          }
                        })()}
                        </div>
                        
                    ))}
                </Box>
                <Box id="input-box" style={{'width':'90%','backgroundColor':'#63787E','borderRadius':'15px','padding':'10px','margin':'auto'}}>
                    <TextField fullWidth id="input-field" variant="outlined" style={{'margin':'5px','backgroundColor':'#CCE2DD','borderRadius':'15px'}} 
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton edge="end" variant="contained" onClick={handleButtonClick}>
                                  <SendIcon></SendIcon>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                    
                    />
                </Box>
            </Box>
        </div>
    )
}