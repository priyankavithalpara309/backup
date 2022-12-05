import logo from './logo.svg';
import React from 'react';
import './App.css';
import First1 from './components/Expenses/FirstComponent'
import NewExpense from './components/NewExpenses/NewExpense';

function App() {

  const expense = [
    { id: 1, title: 'Car Insurance', price: 258.96, date: new Date(2022, 11, 4) },
    { id: 2, title: 'TV Insurance', price: 125.97, date: new Date(2022, 8, 11) },
    { id: 3, title: 'New Desk Insurance', price: 85.78, date: new Date(2022, 9, 5) },
    { id: 4, title: 'bike Insurance', price: 98.84, date: new Date(2022, 6, 9) }
  ];

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2',{},"Let's get started!"),
  //   React.createElement(First1,{items:expense})
  // )

  return (
     <div>
      {/* <h2>Let's get started!</h2> */}
      <NewExpense></NewExpense>
      <First1 items={expense} />
    </div>    
  );
}

export default App;
