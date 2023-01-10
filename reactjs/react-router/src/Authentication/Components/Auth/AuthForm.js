import { useState, useRef } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) { }
        else {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9tm0ECIBS3jkCmWxqMu6emClWWT2cvF8', {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            ).then((res) => {
                if (res.ok) {

                } else {
                    return res.json().then((data) => {
                        console.log(data);
                    });
                }
            });
        }
    };

    return (
        <section className={styles.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className={styles.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef} />
                </div>
                <div className={styles.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button type='button' className={styles.toggle} onClick={switchAuthModeHandler}>{isLogin ? 'Create new Account' : 'Login with existing account'}</button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;