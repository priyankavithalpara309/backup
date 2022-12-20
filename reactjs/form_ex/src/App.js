import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import First1 from './components/Expenses/FirstComponent'
import NewExpense from './components/NewExpenses/NewExpense';
import SimpleInput from './components/SimpleInput';
import BasicForm from './components/BasicForm';

// const DUMMY_DATA = [
//   { id: 1, title: 'Car Insurance', amount: 258.96, date: new Date(2020, 11, 4) },
//   { id: 2, title: 'TV Insurance', amount: 125.97, date: new Date(2022, 8, 11) },
//   { id: 3, title: 'New Desk Insurance', amount: 85.78, date: new Date(2021, 9, 5) },
//   { id: 4, title: 'bike Insurance', amount: 98.84, date: new Date(2022, 6, 9) }
// ];

function App() {
  // child to parent communication

  // const [expenses, setExpenses] = useState(DUMMY_DATA)

  // const addExpense = (expense) =>{
  //   setExpenses((prevExpenses) => {
  //     return [expense, ...prevExpenses];
  //   })

  //   console.log(expense);
    
  // }

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2',{},"Let's get started!"),
  //   React.createElement(First1,{items:expense})
  // )

  return (
    //  <div>
    //   {/* <h2>Let's get started!</h2> */}
    //   <NewExpense onaddExpense={addExpense}></NewExpense>
    //   <First1 items={expenses} />
    // </div>    

    <div className="app">
      {/* <SimpleInput />       */}
      <BasicForm />
    </div>
  );
}

export default App;
