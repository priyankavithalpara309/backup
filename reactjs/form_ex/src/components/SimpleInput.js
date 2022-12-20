import { useEffect, useRef, useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {

    // const nameInputRef = useRef();
    // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);

    //validation using hook

    const{
        value: enteredName, 
        isValid:enteredNameIsValid, 
        hasError:nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        InputBlurHandler: nameBlurHandler,
        reset: resetNameInput
    } = useInput(value => value.trim() !== '');

    //re-using custom hook
    const{
        value:enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        InputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    // const [enteredName, setEnteredName] = useState('');    
    // const [enteredEmail, setEnteredEmail] = useState('');

    // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
    // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

    // const enteredNameIsValid = enteredName.trim() !== '';
    // const enteredEmailIsValid = enteredEmail.includes('@');

    // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;    

    let formIsValid = false;

    if(enteredNameIsValid && enteredEmailIsValid){
        formIsValid = true;
    }

    // useEffect(() => {
    //     if(enteredNameIsValid){
    //         console.log('Name Input is Valid!');
    //     }
    // },[enteredNameIsValid]);

    // const nameInputChangeHandler = (event) => {
    //     setEnteredName(event.target.value);
    // }

    // const emailInputChangeHandler = (event) => {
    //     setEnteredEmail(event.target.value);
    // }

    //lost focus
    // const nameInputBlurHandler = (event) => {
    //     setEnteredNameTouched(true);

        // if(enteredName.trim() === ''){
        //     setEnteredNameIsValid(false);
        //     return;
        // }
    // }

    // const emailInputBlurHandler = (event) => {
    //     setEnteredEmailTouched(true);
    // }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        // setEnteredNameTouched(true);
        // setEnteredEmailTouched(true);

        if(!enteredNameIsValid){
            return;
        }

        // if(enteredName.trim() === ''){
        //     setEnteredNameIsValid(false);
        //     return;
        // }

        // setEnteredNameIsValid(true);

        console.log(enteredName);

        // const enteredvalue = nameInputRef.current.value;
        // console.log(enteredvalue);

        // setEnteredName('');
        // setEnteredNameTouched(false);
        resetNameInput();
        resetEmailInput();

        // setEnteredEmail('');
        // setEnteredEmailTouched(false);
    };

    // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    // const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

    const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';    
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';
    // const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

    return(

        <form onSubmit={formSubmitHandler}>            
            <div className={nameInputClasses}>
                <label htmlFor='name'>Your Name</label>
                {/* <input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />                
                {nameInputIsInvalid && (<p className='error-text'>Name must not be empty.</p>)} */}
                <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName} />                
                {nameInputHasError && (<p className='error-text'>Name must not be empty.</p>)}
            </div>
            <div className={emailInputClasses}>
                <label htmlFor='email'>Your E-Mail</label>
                <input type='email' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler} value={enteredEmail} />
                {emailInputHasError && (<p className='error-text'>Enter valid E-Mail.</p>)}
                {/* <input type='email' id='email' onChange={emailInputChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
                {emailInputIsInvalid && (<p className='error-text'>Enter valid E-Mail.</p>)} */}
            </div>
            <div className='form-actions'>
                <button disabled={!formIsValid}>Submit</button>
            </div>
        </form>

        // <form onSubmit={formSubmitHandler}>
        //     {/* <div className='form-control'> */}
        //     <div className={nameInputClasses}>
        //         <label htmlFor='name'>Your Name</label>
        //         <input type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} />
        //         {/* <input ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} onBlur={nameInputBlurHandler} value={enteredName} /> */}
        //         {nameInputIsInvalid && (<p className='error-text'>Name must not be empty.</p>)}
        //     </div>
        //     <div className='form-actions'>
        //         <button disabled={!formIsValid}>Submit</button>
        //     </div>
        // </form>
    );
};

export default SimpleInput;