import { useState } from 'react';
import styles from './Comments.module.css';

import NewCommentForm from './NewCommentForm';

const Comments = () =>{

    const [isComment, setIsComment] = useState(false);

    const addCommentHandler = () => {
        setIsComment(true);
    };

    return(
        <section className={styles.comments}>
            <h2>User Comments</h2>
            {!isComment && <button className='btn' onClick={addCommentHandler}>Add a Comment</button>}
            {isComment && <NewCommentForm />}
            <p>Comment...</p>
        </section>        
    );
}

export default Comments;