import styles from './TodoItem.module.css';

const TodoItems: React.FC<{text: string; onRemoveTodo:() => void}> = (props) =>{
    return <li className={styles.item} onClick={props.onRemoveTodo}>{props.text}</li>;
}

export default TodoItems;