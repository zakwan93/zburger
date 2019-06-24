import React from 'react';
import burgerLogo from './../../assets/Images/burger-logo.png';
import Classes from './Logo.css';

const logo = (props) => (
    <div className = { Classes.Logo } style = {{ height: props.height}} >
        <img src={burgerLogo} alt="Burger Logo"/> 
    </div>
);

export default logo;