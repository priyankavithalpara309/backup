import { Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './QuoteForm.module.css';

const QuoteForm = (props) => {

    const [isEntering, setIsEntering] = useState(false);

    const authorInputRef = useRef();
    const textInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredText = textInputRef.current.value;

        props.onAddQuote({ author: enteredAuthor, text: enteredText });

    };

    const finishEnteringHandler = () => {
        setIsEntering(false);
    };

    const formOnFocus = () => {
        setIsEntering(true);
    };

    return (
        <Fragment>
            {/* when focus lose it will give message */}            
            <Prompt when={isEntering} message={(location) => 'Are you sure you want to leave? All your entered data will be lost!'} />
            <Card>
                <form className={styles.form} onSubmit={submitHandler} onFocus={formOnFocus}>
                    {props.isLoading && (
                        <div className={styles.loading}>
                            <LoadingSpinner />
                        </div>
                    )}

                    <div className={styles.control}>
                        <label htmlFor='author'>Author</label>
                        <input type='text' id='author' ref={authorInputRef} />
                    </div>
                    <div className={styles.control}>
                        <label htmlFor='text'>Text</label>
                        <textarea id='text' rows='5' ref={textInputRef}></textarea>
                    </div>
                    <div className={styles.actions}>
                        <button className='btn' onClick={finishEnteringHandler}>Add Quote</button>
                    </div>
                </form>
            </Card>
        </Fragment>
    )
}

export default QuoteForm;