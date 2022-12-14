import React, { useContext, useState } from "react";
import Button from "../UI/Button/Button";

import Card from '../UI/Card/Card';
import styles from './Home.module.css';
import AutoContext from "../../store/auth-context";

const Home = (props) => {
    const AutoCtx = useContext(AutoContext);
    return (
        <Card className={styles.home}>
            <h1>Welcome Back!</h1>
            {/* <Button onClick={props.onLogout}>Logout</Button> */}
            <Button onClick={AutoCtx.onLogout}>Logout</Button>
        </Card>
    )
}

export default Home;

