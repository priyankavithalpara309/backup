import { Component } from "react";
import User from "./User";

import styles from './Users.module.css';

class Users extends Component{
    constructor(){
        super();
        this.state = {
            showUsers: true,
            more: 'Test',
        };
    }

    toggleHandler() {
        this.setState((curState) => {            
            return {showUsers: !curState.showUsers};            
        });        
    }   

    render(){
        const usersList = (
            <ul>
                {this.props.users.map((user) => (
                    <User key={user.id} name={user.name} />
                ))}
            </ul>
        );

        return(
            <div className={styles.users}>
                <button onClick={this.toggleHandler.bind(this)}>{this.state.showUsers ? 'Hide' : 'Show'} Users</button>
                {this.state.showUsers && usersList}
            </div>
        )
    }
}

// const Users = () => {
//     const [showUsers, setShowUsers] = useState(true);

//     const toggleHandler = () => {
//         setShowUsers((curState) => !curState);
//     };

//     const usersList = (
//         <ul>
//             {DUMMY_USERS.map((user) => (
//                 <User key={user.id} name={user.name} />
//             ))}
//         </ul>
//     );

//     return (
//         <div className={styles.users}>
//             <button onClick={toggleHandler}>{showUsers ? 'Hide' : 'Show'} Users</button>          
//             {showUsers && usersList}
//         </div>
//     )

// };
export default Users;