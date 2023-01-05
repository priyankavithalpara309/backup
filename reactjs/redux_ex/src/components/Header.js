import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth";
// import { authActions } from "../Store/index";
import styles from './Header.module.css';

const Header = () => {

    const dispatch = useDispatch();

    const logoutHandler = (event) => {
        dispatch(authActions.logout());
    }

    const isAuth = useSelector(state => state.auth.isAuthentication)
    return(
        <header className={styles.header}>
            <h1>Redux Auth</h1>

            {isAuth && <nav>
                <ul>
                    <li>
                        <a href="/">My Products</a>
                    </li>
                    <li>
                        <a href="/">My Sales</a>
                    </li>
                    <li>
                        <button onClick={logoutHandler}>Logout</button>
                    </li>
                </ul>
            </nav>}            
        </header>
    )
}

export default Header;