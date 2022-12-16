import logo from './logo.svg';
import React, {useState, useCallback, useMemo} from 'react';
import First1 from './components/Expenses/FirstComponent'
import NewExpense from './components/NewExpenses/NewExpense';
import Button from './components/Button12/Button';
import DemoOutput from './components/Demo/DemoOutput';
import DemoList from './components/Demo/DemoList';
import './App.css';

function App() {

  // const expense = [
  //   { id: 1, title: 'Car Insurance', price: 258.96, date: new Date(2022, 11, 4) },
  //   { id: 2, title: 'TV Insurance', price: 125.97, date: new Date(2022, 8, 11) },
  //   { id: 3, title: 'New Desk Insurance', price: 85.78, date: new Date(2022, 9, 5) },
  //   { id: 4, title: 'bike Insurance', price: 98.84, date: new Date(2022, 6, 9) }
  // ];

  // const [showParagraph, setShowParagraph] = useState(false);
  // const [allowToggle, setAllowToggle] = useState(false);
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  // console.log('APP RUNNING');

  const listItems = useMemo(() => [5, 3, 8, 7, 1], []);

  // const toggleParagraphHandler = useCallback(() => {
  //   if(allowToggle){
  //     setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  //   }    
  // }, [allowToggle]);

  // const allowToggleHandler = () => {
  //   setAllowToggle(true);
  // };

  // return React.createElement(
  //   'div',
  //   {},
  //   React.createElement('h2',{},"Let's get started!"),
  //   React.createElement(First1,{items:expense})
  // )

  return (    
     <div>
        <div className="app">
          <DemoList title={listTitle} items={listItems} />
          <Button onClick={changeTitleHandler}>Change List Title</Button>
          {/* <h1>Test this work or not</h1>
          <DemoOutput show={showParagraph} />
          <Button onClick={allowToggleHandler}>Allow Toggling</Button>
          <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button> */}
        </div>
      {/* <h2>Let's get started!</h2> */}
      {/* <NewExpense></NewExpense>
      <First1 items={expense} /> */}
    </div>    
  );
}

export default App;
