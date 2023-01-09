import { Fragment } from "react";

import styles from './Layout.module.css';
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
    console.log(props.children);
    return(
        <Fragment>
            <MainNavigation />
            <main className={styles.main}>{props.children}</main>
        </Fragment>
    );
};

export default Layout;