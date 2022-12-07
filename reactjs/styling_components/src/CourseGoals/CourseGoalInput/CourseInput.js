import React, { useState } from "react";
import Button from "../../UI/Button/Button";

import './CourseInput.css';

const CourseGoalInput = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    const goalInputChange = (event) => {
        if (event.target.value.trim().length > 0) {
            setIsValid(true);
        }
        setEnteredValue(event.target.value);
    }

    const formSubmit = (event) => {
        event.preventDefault();
        if (enteredValue.trim().length === 0) {
            setIsValid(false);
            return;
        }
        props.onAddGoal(enteredValue);
    }

    return (
        //inline css

        // <form onSubmit={formSubmit}>
        //     <div className="form-control">
        //         <label style={{color: !isValid ? 'red' : 'black'}}>Course Goal</label>
        //         <input style={{borderColor: !isValid ? 'red' : 'black', background: !isValid ? 'salmon' : 'transparent'}} type='text' onChange={goalInputChange}/>
        //     </div>
        //     <Button type="submit">Add Goal</Button>
        // </form>

        <form onSubmit={formSubmit}>
            <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
                <label>Course Goal</label>
                <input type='text' onChange={goalInputChange} />
            </div>
            <Button type="submit">Add Goal</Button>
        </form>
    )
}

export default CourseGoalInput;