import React ,{useState} from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {

    const [enterTitle, setEnterTitle] = useState('');
    const [enterAmount, setEnterAmount] = useState('');
    const [enterDate, setEnterDate] = useState('');

    // const [userInput, setUserInput] = useState({
    //     enterTitle:'',
    //     enterAmout:'',
    //     enterDate:''
    // })

    const titleChange = (event) => {
        setEnterTitle(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enterTitle:event.target.value,
        // })

        // setUserInput((prevState) => {
        //     return { ...prevState,enterTitle:event.target.value};
        // })
    }

    const amountChange = (event) => {
        setEnterAmount(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enterAmout:event.target.value,
        // })

        // setUserInput((prevState) => {
        //     return { ...prevState,enterAmout:event.target.value};
        // })
    }

    const dateChange = (event) => {
        setEnterDate(event.target.value);
        // setUserInput({
        //     ...userInput,
        //     enterDate:event.target.value
        // })

        // setUserInput((prevState) => {
        //     return { ...prevState,enterDate:event.target.value};
        // })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const expenseData = {
            title:enterTitle,
            amount:enterAmount,
            date: new Date(enterDate)
        }

        props.onSave(expenseData);        

        /* clear data */
        setEnterTitle('');
        setEnterAmount('');
        setEnterDate('');
    };

    return <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
            <div className="new-expense__control">
                <label>Title</label>
                <input type="text" value={enterTitle} onChange={titleChange} />
            </div>
            <div className="new-expense__control">
                <label>Amount</label>
                <input type="number" value={enterAmount} min="0.01" step="0.01" onChange={amountChange} />
            </div>
            <div className="new-expense__control">
                <label>Date</label>
                <input type="date" value={enterDate} min="2019-01-01" max="2022-12-31" onChange={dateChange} />
            </div>            
        </div>
        <div className="new-expense__actions">
            <button type="button" onClick={props.onClose}>Cancel</button>
            <button type="submit">Add Expense</button>
        </div>
    </form>
}

export default ExpenseForm;