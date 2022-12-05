import ExpenseDate from '../Expenses/ExpenseDate';
import React, { useState} from 'react';
import Card from '../UI/Card';
import '../Expenses/SecondComponent.css';

const SecondComp = (props) => {   
    /* this is example of props */   

    // const show = () => {
    //     console.log("click event!!");
    // }
    
    
    /*use of state */
        const [title, setTitle] = useState(props.title);

        const clickHandler = () => {
            setTitle('update');
            console.log(title);
        };
     
    
    return(   
        /*use another component */            
        <Card className="expense-item">
        <ExpenseDate date={props.date}></ExpenseDate>
            <div className="expense-item__description">
                <h2>{title}</h2>
                <div className="expense-item__price">$ {props.amount}</div>                
            </div>
            <button onClick={clickHandler}>click me</button>
            {/* <button onClick={() => {console.log("hello")}}>click me</button> */}
            
        </Card>

        // <div className="expense-item">                
        // <ExpenseDate date={props.date}></ExpenseDate>
        //     <div className="expense-item__description">
        //         <h2>{props.title}</h2>
        //         <div className="expense-item__price">$ {props.amount}</div>
        //     </div>
        // </div>
    );     
}

export default SecondComp;