import { Fragment } from "react";

import HeaderCardButton from "./HeaderCardButton";
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';

const Header = (props) => {
    console.log(props);
    return(
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCardButton onClick={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt='A table full of delicious food!' />
            </div>
        </Fragment>
    );
};

export default Header;