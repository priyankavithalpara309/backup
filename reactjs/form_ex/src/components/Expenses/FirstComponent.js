import React, { useState } from 'react';

import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseList from './ExpensesList';
import ExpenseChart from './ExpenseChart';
import '../Expenses/FirstComponent.css';

function FirstComp(props) {

  // const expenseDate = new Date();
  // const expenseTitle = 'Car Insurance';
  // const expensePrice = 258.63;
  // return(
  //     <div className="expense-item">
  //         <div>{expenseDate.toDateString()}</div>
  //         <div className="expense-item__description">
  //             <h2>{expenseTitle}</h2>
  //             <div className="expense-item__price">$ {expensePrice}</div>
  //         </div>
  //     </div>
  // )    

  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChange = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterExpense = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  /*dynamic data show */

  return (
    <div>
      <Card className="expenses">
        <ExpenseFilter selected={filteredYear} onChangeFilter={filterChange} />   
        <ExpenseList items={filterExpense}></ExpenseList>
        <ExpenseChart expense_data={filterExpense}></ExpenseChart>
      </Card>

      {/* <Card className="expenses">
        <ExpenseFilter selected={filteredYear} onChangeFilter={filterChange} />
        {filterExpense.length == 0 ? (<p>No expenses found</p>) : (
          filterExpense.map((expense) => (
            <SecondComp
              key={expense.id}
              title={expense.title}
              amount={expense.amount}
              date={expense.date}
            />
          ))
        )}

      </Card> */}
    </div>

  )

  //   return (
  //     <div className="expenses">
  //       <SecondComp
  //         title={props.items[0].title}
  //         amount={props.items[0].price}
  //         date={props.items[0].date}
  //       />
  //       <SecondComp
  //         title={props.items[1].title}
  //         amount={props.items[1].price}
  //         date={props.items[1].date}
  //       />
  //       <SecondComp
  //         title={props.items[2].title}
  //         amount={props.items[2].price}
  //         date={props.items[2].date}
  //       />
  //       <SecondComp
  //         title={props.items[3].title}
  //         amount={props.items[3].price}
  //         date={props.items[3].date}
  //       />
  //     </div>
  //   );

};

export default FirstComp;