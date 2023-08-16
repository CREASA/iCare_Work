// TO DO: implement the care bot chat page
import React from 'react'; //import React Component

import { CareBotChat } from '../component/CareBot' //import the coach bot chat component

export function CareBot(props) {

    return (
        <div className='pagebody'>
            {/* TODO: remove the line and edit the page css */}
            <div>This is the Care Bot Chat Page</div>
            <CareBotChat />
        </div>
    );
}