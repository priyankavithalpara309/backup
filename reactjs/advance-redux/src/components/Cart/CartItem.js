import styles from './CartItem.module.css';
import { cartActions } from '../../Store/cart-slice';
import { useDispatch } from 'react-redux';
// import {counterActions} from '../../Store/index';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const { title, quantity, total, price, id } = props.item;

    const removeItemHandler = () => {
        dispatch(cartActions.removeItemFromCart(id));
    };

    const addItemHandler = () => {
        dispatch(
            cartActions.addItemToCart({
                id,
                title,
                price,
            })
        );
    };

    return (
        <li className={styles.item}>
            <header>
                <h3>{title}</h3>
                <div className={styles.price}>
                    ${total.toFixed(2)}{''}
                    <span className={styles.itemprice}>(${price.toFixed(2)}/item)</span>
                </div>
            </header>
            <div className={styles.details}>
                <div className={styles.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={styles.actions}>
                    <button onClick={removeItemHandler}>-</button>
                    <button onClick={addItemHandler}>+</button>
                </div>
            </div>
        </li>
    );
};
export default CartItem;