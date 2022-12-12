import React, { Fragment, useState } from "react";
import AddUser from "./components/Users/addUser";
import UserList from "./components/Users/UserList";

function App(){

  const[usersList, setUsersList] = useState([]);
  
  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => {
      return [
        ...prevUsersList,
        {name:uName, age:uAge, id:Math.random().toString()},
      ];
    });
  };

  return(
    /*Use of fragment*/
    <Fragment>
      <AddUser onAddUser={addUserHandler}/>
      <UserList users={usersList}/>
    </Fragment>
  );
}

export default App;