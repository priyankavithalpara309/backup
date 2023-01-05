import { useDispatch } from "react-redux";
import { cartActions } from "../../Store/cart-slice";
import Card from "../UI/Card";
import styles from "./ProductsItem.module.css";

const ProductsItem = (props) => {
    const dispatch = useDispatch();

    const { title, price, description, id } = props;

    const addToCartHandler = () => {
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
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={styles.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={styles.actions}>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductsItem;