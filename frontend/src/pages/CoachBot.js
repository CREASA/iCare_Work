// TO DO: implement the coach bot chat page
import React from 'react'; //import React Component
import { CoachBotChat } from '../component/CoachBot' //import the coach bot chat component
import Box from '@mui/material/Box';



export function CoachBot(props) {

    return (
        <div className='pagebody'>
            {/* TODO: remove the line and edit the page css */}
            <Box className='d-flex justify-content-center' style={{ height: '90vh', margin: 'auto', display: 'block' }}>
                <div style={{ 'display': 'inline-block', 'width': '40%', height: '85vh' }}><img src={require('../component/img/CoachBot.png')} style={{ height: '100%' }} /></div>
                <div style={{ 'display': 'inline-block', 'width': '60%', 'alignContent': "bottom" }}><CoachBotChat /> </div>
            </Box>

        </div>
    );
}