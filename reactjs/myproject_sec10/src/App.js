import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AutoContext from './store/auth-context';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*store data in localstoreg */
  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if(storedUserLoggedInInformation === '1')
  //   {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {   
  //   localStorage.setItem('isLoggedIn','1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  const ctx = useContext(AutoContext);
  return (    

    <React.Fragment>
    <MainHeader />
    <main>
      {!ctx.isLoggedIn && <Login />}
      {ctx.isLoggedIn && <Home />}
    </main>    
  </React.Fragment>

    //using react context
    // <AutoContext.Provider value={{isLoggedIn: isLoggedIn}}>
    //   <MainHeader onLogout={logoutHandler} />
    //   <main>
    //     {!isLoggedIn && <Login onLogin={loginHandler} />}
    //     {isLoggedIn && <Home onLogout={logoutHandler} />}
    //   </main>    
    // </AutoContext.Provider>  

    // <React.Fragment>    
    //   <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
    //   <main>
    //     {!isLoggedIn && <Login onLogin={loginHandler} />}
    //     {isLoggedIn && <Home onLogout={logoutHandler} />}
    //   </main>    
    // </React.Fragment>
  );
}

export default App;