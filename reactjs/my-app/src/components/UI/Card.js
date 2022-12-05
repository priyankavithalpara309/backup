import '../UI/Card.css';
import React from 'react';

/* example of add children props */
function Card(props){
    const classes = 'card ' + props.className;  
    return <div className={classes}>{props.children}</div>;
}

export default Card;