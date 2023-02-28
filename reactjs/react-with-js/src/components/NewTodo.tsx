import React, { useRef } from "react";
import styles from './NewTodo.module.css';

const NewTodo: React.FC<{onAddTodo: (text:string) => void}> =(props) =>{
    const todoTextRef=useRef<HTMLInputElement>(null);

    const submitHandler= (event: React.FormEvent) =>{
        event.preventDefault();

        const enterText = todoTextRef.current!.value;

        if(enterText.trim().length === 0){
            return;
        }

        props.onAddTodo(enterText);
    };

    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <label htmlFor="text">Todo Text</label>
            <input type='text' id='text' ref={todoTextRef} />
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo;