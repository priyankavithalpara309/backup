import { Fragment, useContext} from 'react';

import Modal from '../UI/Modal';
import CartItems from './CartItems';
import styles from './Cart.module.css';
import CartContext from '../../Store/cart-context';

const Cart = (props) => {

    const cartCtx = useContext(CartContext);    

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
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

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
                {/* <button className={styles.button}>Order</button> */}
            </div>
        </Modal>
    );
};

export default Cart;