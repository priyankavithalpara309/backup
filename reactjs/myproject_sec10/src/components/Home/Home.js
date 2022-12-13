import React from "react";
import Button from "../UI/Button/Button";

import Card from '../UI/Card/Card';
import styles from './Home.module.css';

const Home = (props) => {
    return (
        <Card className={styles.home}>
            <h1>Welcome Back!</h1>
            <Button onClick={props.onLogout}>Logout</Button>
        </Card>
    )
}

export default Home;

