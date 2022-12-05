import '../Expenses/ExpenseDate.css';
import React from 'react';

function ExpenseDate(props) {
    const month = props.date.toLocaleString('en-US', { month: 'long' });
    const day = props.date.toLocaleString('en-US', { day: '2-digit' });
    const year = props.date.getFullYear();

    return (
        <div className='expense_date'>
            <div className='expense_month'>{month}</div>
            <div className='expense_year'>{year}</div>
            <div className='expense_day'>{day}</div>            
        </div>
    );
}

export default ExpenseDate;