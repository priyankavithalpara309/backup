import Counter from './components/Counter';
import CounterClassBase from './components/CounterClassBase';
import Auth from './components/Auth';
import Header from './components/Header';
import { Fragment } from 'react';

const App = () => {
  return(
    <Fragment>
      <Header/>
      <Auth/>
      <Counter />
    </Fragment>    
    // <CounterClassBase /> //use class base counter
  );
}

export default App;