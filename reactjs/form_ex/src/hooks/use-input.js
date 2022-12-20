import { useState, useReducer } from "react";

const initState = {
    value: '',
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type == 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }

    if (action.type == 'BLUR') {
        return { isTouched: true, value: state.value };
    }
    if (action.type = 'RESET') {
        return { isTouched: false, value: '' };
    }

    return inputStateReducer;
};

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initState
    );
    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    };

    const InputBlurHandler = event => {
        dispatch({ type: 'BLUR' });
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
    }

    // const [enteredValue, setEnteredValue] = useState('');
    // const [isTouched, setIsTouched] = useState(false);

    // const valueIsValid = validateValue(enteredValue);
    // const hasError = !valueIsValid && isTouched;

    // const valueChangeHandler = (event) => {
    //     setEnteredValue(event.target.value);
    // };

    // const InputBlurHandler = (event) => {
    //     setIsTouched(true);
    // };

    // const reset = () => {
    //     setEnteredValue('');
    //     setIsTouched(false);
    // };

    return {
        value: inputState.value, isValid: valueIsValid, hasError, valueChangeHandler, InputBlurHandler, reset
        // value: enteredValue, isValid:valueIsValid, hasError, valueChangeHandler, InputBlurHandler, reset
    };
};

export default useInput;