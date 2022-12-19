import styles from './TaskItems.module.css';

const TaskItem = (props) => {
  return <li className={styles.task}>{props.children}</li>
};

export default TaskItem;