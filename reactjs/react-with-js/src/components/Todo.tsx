import React from "react";
import TodoItems from "./TodoItems";
import Todo from "../models/Todo";
import styles from './Todo.module.css';

const Todos: React.FC<{items: Todo[]; onRemoveTodo:(id: string) => void}> = (props) =>{
    return(
        <ul className={styles.todos}>
            {props.items.map((item) =>(
                <TodoItems key={item.id} text={item.text} onRemoveTodo={props.onRemoveTodo.bind(null, item.id)} />
            ))}
        </ul>
        // <ul>
        //     {props.items.map((item:any) =>(
        //         <li key={item.id}>{item.text}</li>
        //     ))}
        // </ul>
    );
}

// const Todos = (props:any) =>{
//     return(
//         <ul>
//             {props.items.map((item:any) =>(
//                 <li key={item}>{item}</li>
//             ))}
//         </ul>
//     );
// }
export default Todos;