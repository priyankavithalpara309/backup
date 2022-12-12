import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/wrapper";
import classes from './addUser.module.css';

const AddUser = (props) => {

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    // const [enteredUsername, setEnteredUsername] = useState('');
    // const [enteredAge, setEnteredAge] = useState('');

    /*error module */
    const [error, setError] = useState();

    const addUser = (event) => {
        event.preventDefault();

        const enteredUsername = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        /*Validation */
        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }
        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (>0).'
            })
            return;
        }
        // console.log(enteredUsername, enteredAge);

        props.onAddUser(enteredUsername, enteredAge);
        // setEnteredUsername('');
        // setEnteredAge('');
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    // const userNameChange = (event) => {
    //     setEnteredUsername(event.target.value);
    // };

    // const userAgeChange = (event) => {
    //     setEnteredAge(event.target.value);
    // };

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUser}>
                    <label htmlFor="name">User Name</label>
                    <input id="name" type='text' ref={nameInputRef} />
                    <label htmlFor="age">Age (Year)</label>
                    <input id='age' type='number' ref={ageInputRef}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>

        // <Wrapper>            
        //     {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}            
        //     <Card className={classes.input}>
        //         <form onSubmit={addUser}>
        //             <label htmlFor="name">User Name</label>
        //             <input id="name" type='text' value={enteredUsername} onChange={userNameChange} />
        //             <label htmlFor="age">Age (Year)</label>
        //             <input id='age' type='number' value={enteredAge} onChange={userAgeChange} />
        //             <Button type="submit">Add User</Button>
        //         </form>
        //     </Card>
        // </Wrapper>
    );
};

export default AddUser;