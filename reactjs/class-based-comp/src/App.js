import './App.css';
import UserFinder from './Components/UserFinder';
import UserContext from './Store/users-context';

const DUMMY_USERS = [
  {id: 'u1', name: 'Max'},
  {id: 'u2', name: 'Manuel'},
  {id: 'u3', name: 'Julie'},
];

function App() {

  const userContext = {
    users: DUMMY_USERS
  }

  return (
    <UserContext.Provider value={userContext}>
      <UserFinder />
    </UserContext.Provider>
  );
}

export default App;
