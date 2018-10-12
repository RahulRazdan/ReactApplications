import React from 'react'
import classes from './Logo.module.css'
import image from '../../assets/Images/burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={image} alt="MyBurger"/>
    </div>
);

export default logo;