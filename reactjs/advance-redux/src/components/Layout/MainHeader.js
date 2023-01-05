import styles from './MainHeader.module.css'
import CartButton from '../Cart/CartButton';

const MainHeader = (props) => {
    return(
      <header className={styles.header}>
            <h1>ReduxCart</h1>
      <nav>
        <ul>
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
        </header>
    );
};

export default MainHeader;