
import React, {useState, useEffect} from "react";

const AutoContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AutoContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if(storedUserLoggedInInformation === '1')
        {
          setIsLoggedIn(true);
        }
      }, []);
    
      const loginHandler = (email, password) => {   
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      };

      return(
        <AutoContext.Provider value={{isLoggedIn: isLoggedIn, onLogin:loginHandler, onLogout:logoutHandler,}}>{props.children}</AutoContext.Provider>
      )
}

export default AutoContext;