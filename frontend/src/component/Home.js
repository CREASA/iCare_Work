import React from 'react'; //import React Component
import { Link, NavLink } from 'react-router-dom';

export function Welcome(props) {

    return (
        <div className='pagebody'>
            <br/><br/><br/><br/><br/><br/>
            <h1 className="home">Welcome to iCare</h1>
            <div>This is the home page for iCare</div>
        </div>
    );
}