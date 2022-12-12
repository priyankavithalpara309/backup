import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button/Button";

import './CourseInput.css';

const FormControl = styled.div`
    margin: 8px 0;  
  
  & label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
    color: ${props => (props.invalid ? 'red' : 'black')};
  }
  
  & input {
    display: block;
    width: 100%;
    border: 1px solid ${props => (props.invalid ? 'red' : '#ccc')};
    background: ${props => props.invalid ? '#ffd7d7' : 'transparent'};    
    font: inherit;
    line-height: 1.5rem;
    padding: 0 4px;
  }
  
  & input:focus {
    outline: none;
    background: #fad0ec;
    border-color: #8b005d;
  } 
`

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

    // <form onSubmit={formSubmit}>
    //     <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
    //         <label>Course Goal</label>
    //         <input type='text' onChange={goalInputChange} />
    //     </div>
    //     <Button type="submit">Add Goal</Button>
    // </form>

    <form onSubmit={formSubmit}>
      <FormControl invalid={!isValid}>
        <label>Course Goal</label>
        <input type='text' onChange={goalInputChange} />
      </FormControl>
      <Button type="submit">Add Goal</Button>
    </form>
  )
}

export default CourseGoalInput;