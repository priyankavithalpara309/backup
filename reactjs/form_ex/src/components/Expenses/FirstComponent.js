import React from 'react';
import SecondComp from '../Expenses/SecondComponent';
import Card from '../UI/Card';
import '../Expenses/FirstComponent.css';

function FirstComp(props){

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

    return (
        <Card className="expenses">
          <SecondComp
            title={props.items[0].title}
            amount={props.items[0].price}
            date={props.items[0].date}
          />
          <SecondComp
            title={props.items[1].title}
            amount={props.items[1].price}
            date={props.items[1].date}
          />
          <SecondComp
            title={props.items[2].title}
            amount={props.items[2].price}
            date={props.items[2].date}
          />
          <SecondComp
            title={props.items[3].title}
            amount={props.items[3].price}
            date={props.items[3].date}
          />
        </Card>
      );

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
     
}

export default FirstComp;