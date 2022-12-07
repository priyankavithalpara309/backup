import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import './NewExpense.css';

/*child-to-parent component communication */

const NewExpense = (props) => {

    const [isEnable, setIsEnable] = useState(false);

    const showForm = () =>{
        setIsEnable(true);
    }    

    const closeform = () =>{
        setIsEnable(false);
    }

    const saveExpense = (enterExpenseData) => {
        const expenseData = {
            ...enterExpenseData,
            id: Math.random().toString()
        };

        props.onaddExpense(expenseData);
        setIsEnable(false)
    }

    return (
        <div className="new-expense">
            {!isEnable && (
                <button onClick={showForm}>Add New Expense</button>
            )}
            {isEnable &&(
                <ExpenseForm onSave={saveExpense} onClose={closeform}></ExpenseForm>
            )}
            
        </div>
    )
}

export default NewExpense;