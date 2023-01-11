import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Store/auth-context';
import styles from './ProfileForm.module.css';

const ProfileForm = () =>{  
    const history = useHistory();
    
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext);

    const submitHandler = (event) =>{
        event.preventDefault();

        const enteredNewPassword = newPasswordInputRef.current.value;
        //add validation

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB9tm0ECIBS3jkCmWxqMu6emClWWT2cvF8',{
            method:'POST',
            body: JSON.stringify({
                idToken:authCtx.token,
                password:enteredNewPassword,
                returnSecureToken:false,
            }),
            headers:{
                'Content-Type':'application/json',
            },            
        }).then((res) => {
              // assumption: Always succeeds!
              history.replace('/');
        });        
    };

    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' minLength='7' ref={newPasswordInputRef} />
            </div>
            <div className={styles.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;