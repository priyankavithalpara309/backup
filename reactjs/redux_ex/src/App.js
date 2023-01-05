import Counter from './components/Counter';
import CounterClassBase from './components/CounterClassBase';
import Auth from './components/Auth';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const App = () => {

  const isAuth = useSelector(state => state.auth.isAuthentication);

  return(
    <Fragment>
      <Header/>
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <Counter/>
      {/* <CounterClassBase />  */}
      {/* use class base counter */}
    </Fragment>        
  );
}

export default App;