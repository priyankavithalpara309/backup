import { useRef } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import styles from './QuoteForm.module.css';

const QuoteForm = (props) => {
    const authInputRef = useRef();
    const authTextRef = useRef();

    function submitHandler(event){
        event.preventDefault();
    }

    return (
        <Card>
            <form className={styles.form} onSubmit={submitHandler}>
                {props.isLoading && (
                    <div className={styles.loading}>
                        <LoadingSpinner />
                    </div>
                )}

                <div className={styles.control}>
                    <label htmlFor='author'>Author</label>
                    <input type='text' id='author' ref={authInputRef} />
                </div>
                <div className={styles.control}>
                    <label htmlFor='text'>Text</label>
                    <textarea id='text' rows='5' ref={authTextRef}></textarea>
                </div>
                <div className={styles.control}>
                    <button className='btn'>Add Quote</button>
                </div>
            </form>
        </Card>
    )
}

export default QuoteForm;