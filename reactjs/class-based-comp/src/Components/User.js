import {Component} from "react";
import styles from './User.module.css';

/*Add class component */

class User extends Component{

    componentWillUnmount(){
        console.log('User will unmount!');
    }

    render(){
        return <li className={styles.user}>{this.props.name}</li>
    }
}

// const User = (props) => {
//     return <li className={styles.user}>{props.name}</li>;    
// }

export default User;