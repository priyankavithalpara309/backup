import { Fragment, useEffect, useState, Component } from "react";
import Users from "./Users";
import styles from './UserFinder.module.css';
import UserContext from "../Store/users-context";
import User from "./User";
import ErrorBoundary from "./ErrorBoundary";

class UserFinder extends Component{
    static contextType=UserContext;

    constructor(){
        super();
        this.state = {
            filterUser: [],
            searchTerm: '',
        };
    }

    componentDidMount(){
        //send http request
        this.setState({filterUser:this.context.users});
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.searchTerm !== this.state.searchTerm){
            this.setState({
                filterUser: this.context.users.filter((user) => 
                    user.name.includes(this.state.searchTerm)
                ),
            });
        }
    }

    searchHandler(event){
        this.setState({searchTerm:event.target.value});
    }

    render(){
        return(
            <Fragment>
                <div className={styles.finder}>
                    <input type='search' onChange={this.searchHandler.bind(this)} />
                </div>
                <ErrorBoundary>
                    <Users users={this.state.filterUser} />
                </ErrorBoundary>                
            </Fragment>
        );
    }
}


// const UserFinder = () => {
//     const [filter, setFilter]= useState(DUMMY_USERS);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         setFilter(
//             DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//         );
//     },[searchTerm]);

//     const searchHandler = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     return(
//         <Fragment>
//             <div className={styles.finder}>
//                 <input type='search' onChange={searchHandler} />
//             </div>
//             <Users users={filter} />
//         </Fragment>
//     );
// }

export default UserFinder;