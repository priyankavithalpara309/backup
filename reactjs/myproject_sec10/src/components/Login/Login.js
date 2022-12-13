import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import styles from './Login.module.css';
import Button from '../UI/Button/Button';
import AutoContext from "../../store/auth-context";

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if(action.type === 'USER_INPUT'){
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if(action.type === 'INPUT_BLUR'){
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid:false};
}

const Login = (props) => {

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [emailIsValid, setEmailIsValid] = useState();
    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [passwordIsValid, setPasswordIsValid] = useState();
    const [formIsValid, setFormIsValid] = useState(false);
    
    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
        value: '',
        isValid: null,
    })


    //it execute every change
    // useEffect(() => {
    //     console.log('EFFECT RUNNING');

    //     return () => {
    //       console.log('EFFECT CLEANUP');
    //     };
    //   });

    const autoctx = useContext(AutoContext);
    
    /*it execute ones */
    useEffect(() => {
        console.log('EFFECT RUNNING');

        return () => {
            console.log('EFFECT CLEANUP');
        };
    }, []);

    const { isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('check for validity!');
            setFormIsValid(emailIsValid && passwordIsValid);
        },500);
        return() => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };        
    },[emailIsValid, passwordIsValid]) //check dependense


    // useEffect(() => {
    //     const identifier = setTimeout(() => {
    //         console.log('check for validity!');
    //         setFormIsValid(
    //             enteredEmail.includes('@') && enteredPassword.trim().length > 6
    //         );
    //     },500);
    //     return() => {
    //         console.log('CLEANUP');
    //         clearTimeout(identifier);
    //     };        
    // },[enteredEmail, enteredPassword]) //check dependense

    const onEmailChange = (event) => {
        // setEnteredEmail(event.target.value);
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });       

        setFormIsValid(
            // event.target.value.includes('@') && enteredPassword.trim().length > 6
            event.target.value.includes('@') && passwordState.isValid
        );
    };

    const onPasswordChange = (event) => {
        // setEnteredPassword(event.target.value);      
        dispatchPassword({ type: 'USER_INPUT', val:event.target.value});       
    
        setFormIsValid(
            // event.target.value.trim().length > 6 && enteredEmail.includes('@')
            emailState.isValid && event.target.value.trim().length > 6
        );
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
        // setEmailIsValid(enteredEmail.includes('@'));
    }

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
        // setPasswordIsValid(enteredPassword.trim().length > 6);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        autoctx.onLogin(emailState.value, passwordState.value);
        // props.onLogin(emailState.value, passwordState.value);
        // props.onLogin(enteredEmail, enteredPassword);
    }

    return (
        <Card className={styles.login}>
            <form onSubmit={onSubmitHandler}>
                {/* <div className={`${styles.control} ${emailIsValid === false ? styles.invalid : ''}`}> */}
                <div className={`${styles.control} ${emailState.isValid === false ? styles.invalid : ''}`}>
                    <label htmlFor="email">E-Mail</label>
                    {/* <input type="email" id="email" value={enteredEmail} onChange={onEmailChange} onBlur={validateEmailHandler} /> */}
                    <input type="email" id="email" value={emailState.value} onChange={onEmailChange} onBlur={validateEmailHandler} />
                </div>
                {/* <div className={`${styles.control} ${passwordIsValid === false ? styles.invalid : ''}`}> */}
                <div className={`${styles.control} ${passwordState.isValid === false ? styles.invalid : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={passwordState.value} onChange={onPasswordChange} onBlur={validatePasswordHandler} />
                    {/* <input type="password" id="password" value={enteredPassword} onChange={onPasswordChange} onBlur={validatePasswordHandler} /> */}
                </div>
                <div className={styles.actions}>
                    <Button type="submit" className={styles.btn} disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </Card>
    )
}

export default Login;