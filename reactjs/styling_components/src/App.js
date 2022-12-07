import React,{useState} from "react";
import CourseGoalList from "./CourseGoals/CourseGoalList/CourseList";
import CourseGoalInput from "./CourseGoals/CourseGoalInput/CourseInput";

import './App.css';

const App = () =>{

  const [CourseGoals, setCourseGoals] = useState([
    {text: 'Do all exercises!', id: 'g1'},
    {text: 'Finish the course!', id: 'g2'}
  ]);
  

  const addGoal = (enteredText) => {
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.unshift({text: enteredText, id: Math.random().toString()});
      return updatedGoals;
    })
  };

  const deleteGoal = goalId => {
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== goalId);
      return updatedGoals;
    })
  }

  let content = (<p style={{textAlign: 'center'}}>No goals found. Maybe add one?</p>)

  if(CourseGoals.length > 0){
    content = (
      <CourseGoalList items={CourseGoals} onDeleteItem={deleteGoal} />
    )
  }

  return(
    <div>
      <section id="goal-form">
        <CourseGoalInput onAddGoal={addGoal}/>
      </section>
      <section id="goals">
        {content}
          {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>
    </div>
  );
}

export default App;