import {useContext, useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";

import styles from './HeaderCardButton.module.css';

const HeaderCardButton = (props) => {    
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
      }, 0);

    return(
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCardButton;