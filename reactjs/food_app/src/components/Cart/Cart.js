import React,{ Fragment, useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItems from './CartItems';
import styles from './Cart.module.css';
import CartContext from '../../Store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-9c69c-default-rtdb.firebaseio.com/order.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItems key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd={cartItemAddHandler.bind(null, item)} />
            ))}

            {/* {[{ id: 'c1', name:'Sushi', amount: 2, price:12.99}].map((item)=> (
                <li>{item.name}</li>
            ))} */}
        </ul>
    );

    const modalActions = (
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler} >Order</button>}
            {/* <button className={styles.button}>Order</button> */}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
                {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onClose}>Close</button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}            
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}            
        </Modal>
        // <Modal onClose={props.onClose}>
        //     {cartItems}
        //     <div className={styles.total}>
        //         <span>Total Amount</span>
        //         <span>{totalAmount}</span>
        //     </div>
        //     {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
        //     {!isCheckout && modalActions}
        // </Modal>
    );
};

export default Cart;