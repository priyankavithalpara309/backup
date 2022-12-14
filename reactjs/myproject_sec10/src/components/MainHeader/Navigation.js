import React, { useContext } from "react";
import AutoContext from "../../store/auth-context";

import styles from './Navigation.module.css';

const Navigation = (props) => {
    const ctx = useContext(AutoContext);

    return (
        <nav className={styles.nav}>
            <ul>
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">User</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <a href="/">Admin</a>
                    </li>
                )}
                {ctx.isLoggedIn && (
                    <li>
                        <button onClick={ctx.onLogout}>Logout</button>
                    </li>
                )}
            </ul>  
        </nav>    
        // <nav className={styles.nav}>
        //     <ul>
        //         {props.isLoggedIn && (
        //             <li>
        //                 <a href="/">User</a>
        //             </li>
        //         )}
        //         {props.isLoggedIn && (
        //             <li>
        //                 <a href="/">Admin</a>
        //             </li>
        //         )}
        //         {props.isLoggedIn && (
        //             <li>
        //                 <button onClick={props.onLogout}>Logout</button>
        //             </li>
        //         )}
        //     </ul>
        // </nav>
    );
}

export default Navigation;