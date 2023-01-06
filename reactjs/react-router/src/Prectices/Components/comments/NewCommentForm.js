import { useRef } from 'react';
import styles from './NewCommentForm.module.css';

const NewCommentForm = () =>{

    const commentText= useRef();

    const submitFormHandler = (event) => {
        event.preventDefault();
    }

    return(
        <form className={styles.form} onSubmit={submitFormHandler}>
            <div className={styles.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentText}></textarea>
            </div>
            <div className={styles.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    )
}

export default NewCommentForm;