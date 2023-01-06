import styles from './CommentsItem.module.css';

const CommentsItem = (props) => {
    return(
        <li className={styles.item}>
            <p>{props.text}</p>
        </li>
    )
}

export default CommentsItem;
