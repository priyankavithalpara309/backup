import useInput from "../hooks/use-input";

//form validation using custom hook

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => value.includes('@');

const BasicForm = (props) => {
    const {
        value: enteredFirstName,
        isValid: enteredFirstNameIsValid,
        hasError: firstNameInputHasError,
        valueChangeHandler: firstNameChangeHandler,
        InputBlurHandler: firstNameBlurHandler,
        reset: resetFirstNameInput
    // } = useInput(value => value.trim() !== '');
    }= useInput(isNotEmpty);

    const{
        value: enteredSecondName,        
        isValid: enteredSecondNameIsValid,
        hasError: secondNameInputHasError,
        valueChangeHandler: secondNameChangeHandler,
        InputBlurHandler: secondNameBlurHandler,
        reset: resetSecondNameInput
    // } = useInput(value => value.trim() !== '');
    }= useInput(isNotEmpty);

    const{
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        InputBlurHandler: emailInputBlurHandler,
        reset: resetEmailInput
    // } = useInput(value => value.includes('@'));
    }= useInput(isEmail);

    let formIsValid = false;

    if(enteredFirstNameIsValid && enteredSecondNameIsValid && enteredEmailIsValid){
        formIsValid = true;
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        
        if(!formIsValid){
            return;
        }

        // if(!enteredFirstNameIsValid){
        //     return;
        // }

        resetFirstNameInput();
        resetSecondNameInput();
        resetEmailInput();
    };

    const firstNameClasses = firstNameInputHasError ? 'form-control invalid' : 'form-control';
    const secondNameClasses = secondNameInputHasError ? 'form-control invalid' : 'form-control';
    const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

    return (
        <form onSubmit={formSubmitHandler}>
            <div className='control-group'>
                <div className={firstNameClasses}>
                    <label htmlFor='Firstname'>First Name</label>
                    <input type='text' id='Firstname' onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} value={enteredFirstName} />
                    {firstNameInputHasError && (<p className="error-text">First name must not be empty.</p>)}
                </div>
                <div className={secondNameClasses}>
                    <label htmlFor='Secondname'>Second Name</label>
                    <input type='text' id='Secondname' onChange={secondNameChangeHandler} onBlur={secondNameBlurHandler} value={enteredSecondName} />
                    {secondNameInputHasError && (<p className="error-text">Second name must not be empty</p>)}
                </div>
                <div className={emailInputClasses}>
                    <label htmlFor="email">E-Mail Address</label>
                    <input type='email' id='email' onChange={emailChangeHandler} onBlur={emailInputBlurHandler} value={enteredEmail} />
                    {emailInputHasError && (<p className="error-text">Please enter a valid email address.</p>)}
                </div>                
                <div className="form-actions">
                    <button disabled={!formIsValid}>submit</button>
                </div>
            </div>
        </form>
    );
};

export default BasicForm;