import React from "react";
import Chart from "../Chart/Chart";

const ExpenseChart = (props) => {
  const chartData = [
    {label: 'Jan', value:0},
    {label: 'Feb', value:0},
    {label: 'Mar', value:0},
    {label: 'Apr', value:0},
    {label: 'May', value:0},
    {label: 'Jun', value:0},
    {label: 'Jul', value:0},
    {label: 'Aug', value:0},
    {label: 'Sep', value:0},
    {label: 'Oct', value:0},
    {label: 'Nov', value:0},
    {label: 'Dec', value:0}, 
  ];  

  for(const a1 of props.expense_data){
    const exMonth =a1.date.getMonth();// starting at 0 => January => 0
    console.log(exMonth);   
    chartData[exMonth].value+=a1.amount;    
  }

  return <Chart dataPoints={chartData} />
}

export default ExpenseChart;