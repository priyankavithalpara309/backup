import React, { useState, useEffect, useCallback } from "react";
import Card from '../UI/Card';
import MealItem from './MealItems/MealItem';

import styles from './AvailableMeals.module.css';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = () => {

  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeal = async () => {      
      const mealsList = await fetch('https://food-order-9c69c-default-rtdb.firebaseio.com/meal.json');

      if (!mealsList.ok) {
        throw new Error('Something went wrong!')
      }
      const foodData = await mealsList.json();
      const loadedFood = [];

      console.log(foodData);
      for (const key in foodData) {
        loadedFood.push({
          id: key,
          name: foodData[key].name,
          description: foodData[key].description,
          price: foodData[key].price
        });
      }

      setFood(loadedFood);
      setIsLoading(false);
    };
    
    fetchMeal().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);  

  if (isLoading) {
    return(
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );    
  }

  if(error){
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = food.map((meal) => (
    <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  ));

  // const mealsList = DUMMY_MEALS.map((meal) => (
  //   <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
  // ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;