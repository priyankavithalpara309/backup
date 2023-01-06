// import  {Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import styles from './MainHeader.module.css';

const MainHeader = () => {
    return(
        <header className={styles.header}>            
            <nav>
                <ul>
                    <li>
                    <NavLink activeClassName={styles.active} to={'/welcome'}>Welcome</NavLink>
                        {/* <a href='/welcome'>Welcome</a> */}
                        {/* <Link to={'/welcome'}>Welcome</Link> */}
                    </li>
                    <li>
                        <NavLink activeClassName={styles.active} to={'/product'}>Product</NavLink>
                        {/* <a href='/product'>Product</a> */}
                        {/* <Link to={'/product'} >Products</Link> */}
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default MainHeader;