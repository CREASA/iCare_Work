import React, { useState, useRef, useEffect } from 'react';
//Material UI components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import axios from 'axios';
import { borderRadius } from '@mui/system';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MicIcon from '@mui/icons-material/Mic';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';

// This is the endpoint for local machine
const client = axios.create({
    baseURL: "http://localhost:8000"
});

const PentagonButton = styled(Button)({
    position: 'relative',
    overflow: 'hidden',
    clipPath: 'polygon(0 50%, 10% 0, 100% 0, 100% 100%, 10% 100%)',
    '&:hover': {
        backgroundColor: '#93b2ad',
    },
});;
// Returning a promise that resolves with a response message
// const botResponse = (message) => {
//     return new Promise((resolve) => {
//         var response = "Hi, how can I help you?"
//         client.post(
//             "/chat_test",
//             { "input": message }
//         ).then(function (res) {
//             response = res.data.output; // get the generated response from backend
//             // console.log(res);
//             resolve(response); // add the result to chat area
//         }).catch(error => {
//             console.log(error);
//             // temp view of fake output
//             resolve("Something went wrong, please try again later.");
//         });

//     });
// };


export function CoachBotChat() {
    const recognitionRef = useRef(null);
    const [input, setInput] = useState("");
    const [chat, setChat] = useState([]);
    const [er, setEr] = useState('To be evaluated');
    const [ex, setEx] = useState('To be evaluated');
    const [ip, setIp] = useState('To be evaluated');
    const [scenario, setScenario] = useState('');
    const [total, setTotal] = useState(0);
    const [index, setIndex] = useState(2);
    const [isRecording, setIsRecording] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    // Handler function for the input change event
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
    // scoll to bottom
    var chat_box = document.getElementById("chat-box");
    useEffect(() => {
        try {
            chat_box.scrollTop = chat_box.scrollHeight;
        } catch (error) {
            console.error(error);
        }
    });
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const fetchInitialMessage = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/get_sp', {
                n: index,
            });
            // const response = await botResponse("");
            // const response = "Returning to school after five years has been challenging. I've asked for understanding from teachers and classmates due to my rustiness, but didn't receive it. My stepmom also restricts my computer use, causing me to skip classes. I would appreciate any advice on handling this situation."
            setChat((prevChat) => [
                { text: response.data.sp, type: "receiver" },
            ]);
            setScenario(response.data.sp)
        } catch (error) {
            const response = "Scenarios could not be fetched, please try again later"
            setChat((prevChat) => [
                { text: response, type: "receiver" },
            ]);
            console.error("COULDN'T FETCH SCENARIO",error);
        }
    };
    useEffect(() => {
        // Fetch the initial message from the backend and add it to the chat history


        fetchInitialMessage();
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const nextScenario = () => {
        setIndex(index + 1);
        fetchInitialMessage()
    };

    // Handler function for the button click event
    const handleButtonClick = async () => {
        // recognitionRef.current.stop();
        if (input) {
            // Adding the input message to the chat history
            setChat((prevChat) => [
                ...prevChat,
                { text: input, type: "sender" },
            ]);
            setInput("");
            document.getElementById("input-field").value = "";
            // Calling the demo function to send the message and get a response
            try {
                // const response = await botResponse(input);
                const response = await axios.post('http://127.0.0.1:5000/get_scores', {
                    text: "Seeker post: Literally no friends. I don't know how to interact with other people, I don't have a single friend, and humans can't live like this. Seems like people can just smell the depression and anxiety on me and they stay away. Wish I had the courage to end it.<> Response post: Have you tried exploring out of your circle of people? I've had trouble making friends too but I found that when I put myself out there by taking a part time job or some sorts, I ended up meeting new people who aren't all that bad actually. As to the depression and anxiety, have you seen someone for that?", // Replace with the actual text data
                    rp: input,
                    sp: scenario
                    // sp: "Returning to school after five years has been challenging. I've asked for understanding from teachers and classmates due to my rustiness, but didn't receive it. My stepmom also restricts my computer use, causing me to skip classes. I would appreciate any advice on handling this situation."
                });
                console.log(response);
                setChat((prevChat) => [
                    ...prevChat,
                    { text: response.data.reply, type: "receiver" },
                ]);
                if (total == 0) {
                    console.log('a', er, '  ', ex, '  ', ip, '  ', total)
                    setEr(response.data.er)
                    setEx(response.data.ex)
                    setIp(response.data.ip)
                } else {
                    console.log('b', er, '  ', ex, '  ', ip, '  ', total)
                    let new_er = (er * total + response.data.er) / (total + 1)
                    let new_ex = (ex * total + response.data.ex) / (total + 1)
                    let new_ip = (ip * total + response.data.ip) / (total + 1)
                    setEr(new_er)
                    setEx(new_ex)
                    setIp(new_ip)
                }
                setTotal(total + 1)
                console.log(er, '  ', ex, '  ', ip, '  ', total)
                chat_box.scrollTop = chat_box.scrollHeight;

            } catch (error) {
                setChat((prevChat) => [
                    ...prevChat,
                    { text: "I ran into an error. Please try again later.", type: "receiver" },
                ]);
                console.error(error);
            }
        }

    };


    const captureAudio = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.onstart = () => {
            setIsRecording(true);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            console.log('Converted text:', transcript);
            setIsRecording(false);
        };

        recognition.start();
    };
    return (
        <div>
            <br></br>
            <br></br>
            <div style={{ height: '10vh' }}>

                <IconButton edge="end" variant="contained" size="small" onClick={nextScenario}
                    style={{ backgroundColor: '#81727D', float: 'right', height: '60px', borderRadius: 14, color: 'white', maxWidth: '50%', margin: '10px', padding: '10px' }}>
                    Next Scenario &nbsp;<ArrowForwardIcon />
                </IconButton>

                <IconButton edge="end" variant="contained" size="small" onClick={openModal}
                    style={{ backgroundColor: '#81727D', float: 'right', height: '60px', borderRadius: 14, color: 'white', maxWidth: '50%', margin: '10px', padding: '10px' }}>
                    View Scores
                </IconButton>
            </div>
            <Box style={{ height: '60vh' }}>
                <Box id="chat-box" style={{ 'height': '85%', 'overflow': "auto", 'paddingRight': '30px', fontSize: '20px' }}>
                    {/* <div style={{ margin: '2px', textAlign: 'center' }}>
                        <p style={{ display: 'inline-block', marginLeft: '20px', border: '2px solid black', borderRadius: '5px', padding: '10px', background: 'lightgrey' }}>
                            Please respond to the scenario presented below and provide any advice or feedback you may have.
                        </p>
                    </div> */}
                    {chat.map((message) => (
                        <div>
                            {(() => {
                                if (message.type === "receiver") { //Bot reponses (displayed on the left side)
                                    return (
                                        <div style={{ 'margin': '2px', 'textAlign': 'left' }}>
                                            <div style={{ 'display': 'inline-block', 'width': '81px', 'height': '81px', 'borderRadius': '40px', 'backgroundColor': '#A98993' }} ><img src={require('./img/CoachAvatar.png')} alt="coach bot avatar" style={{ 'height': '81px', 'margin': 'auto', 'display': 'block' }} /> </div>
                                            <p style={{ 'display': 'inline-block', 'marginLeft': '20px', 'borderRadius': '20px', 'padding': '10px', 'backgroundColor': 'rgba(217, 217, 217, 0.41)' }}>
                                                {message.text}
                                            </p>
                                        </div>
                                    )
                                } else {  //Input message (displayed on the right side)
                                    return (
                                        <div style={{ 'margin': '2px', 'textAlign': 'right' }}>
                                            <p style={{ 'display': 'inline-block', 'marginRight': '20px', 'borderRadius': '20px', 'padding': '10px', 'backgroundColor': 'rgba(217, 217, 217, 0.41)' }}>
                                                {message.text}
                                            </p>
                                            <img src={require('./img/Placeholder.png')} style={{ 'display': 'inline-block', 'width': '81px', 'height': '81px', 'borderRadius': '40px' }} alt="user avatar" />
                                        </div>
                                    )
                                }
                            })()}
                        </div>
                    ))}
                </Box>
                <PentagonButton style={{ width: '90%', height: '10%', backgroundColor: '#63787E', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6%', borderRadius: '20px', }}>
                    {/* <Box style={{ width: '60%', height: '75%', backgroundColor: '#63787E', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%', borderRadius: '20px' }}> */}
                    <Box style={{ background: 'rgba(217, 217, 217, 0.41)', color: 'white', position: 'center', borderRadius: '20px', padding: '1%', fontSize: '25px', marginLeft: '10%' }}>
                        <p>Please respond to the scenario presented above and provide any advice or feedback you may have.</p>
                    </Box>
                    {/* </Box> */}
                    {/* <ArrowForwardIcon style={{ fontSize: '48px', position: 'absolute', top: '25px', left: 'calc(50% - 24px)' }} /> */}
                </PentagonButton>
                {/* <div className='d-flex justify-content-center' style={{ height: '15vh' }}>
                    <Box style={{ width: '60%', height: '75%', backgroundColor: '#63787E', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5%', borderRadius: '20px' }}>
                        <Box style={{ background: 'rgba(217, 217, 217, 0.41)', color: 'white', position: 'center', borderRadius: '20px', padding: '1%', fontSize: '25px' }}>
                            <p>Please respond to the scenario presented above and provide any advice or feedback you may have.</p>
                        </Box>
                    </Box>
                </div> */}
                <br /><br />
                <Box id="input-box" style={{ 'width': '90%', 'backgroundColor': '#63787E', 'borderRadius': '15px', 'padding': '10px', 'margin': 'auto' }}>
                    <TextField fullWidth id="input-field" variant="outlined" style={{ 'margin': '5px', 'backgroundColor': '#CCE2DD', 'borderRadius': '15px' }}
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleButtonClick();
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" variant="contained" onClick={captureAudio} sx={{ color: isRecording ? 'red' : 'inherit' }}>
                                        <MicIcon></MicIcon>
                                    </IconButton>

                                    <IconButton edge="end" variant="contained" onClick={handleButtonClick} sx={{ marginLeft: '20px' }}>
                                        <SendIcon></SendIcon>
                                    </IconButton>
                                </InputAdornment>

                            ),
                        }}

                    />
                </Box>
            </Box>
            <Dialog open={isModalOpen} onClose={closeModal} sx={{ textAlign: '-webkit-center', padding: '15px' }}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: 25 }}>AVERAGE SCORES</DialogTitle>
                <hr></hr>
                <div style={{}}>
                    <table style={{ fontSize: 30, margin: '30px', marginTop: '10px' }}>
                        <tr>
                            <td>Emotional Reaction</td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td>{er}</td>
                        </tr>
                        <tr>
                            <td>Exploration</td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td>{ex}</td>
                        </tr>
                        <tr>
                            <td>Interpretation</td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td>{ip}</td>
                        </tr><br/>
                        <tr>
                            <td>Scenarios attempted</td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td>{total}</td>
                        </tr>
                    </table>
                    <h5>0 = No, 1 = Weak, 2 = Strong</h5>
                    <br></br>
                </div>
                <Button variant='contained' onClick={closeModal} sx={{ backgroundColor: '#63787e' }}>Close</Button>
            </Dialog>
        </div>
    )
}
