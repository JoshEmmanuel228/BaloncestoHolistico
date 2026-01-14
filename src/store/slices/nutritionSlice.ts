import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Meal {
  id: string;
  name: string;
  time: string;
  foods: string[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface NutritionState {
  meals: Meal[];
  dailyCalories: number;
  waterIntake: number;
}

const initialState: NutritionState = {
  meals: [],
  dailyCalories: 0,
  waterIntake: 0,
};

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
      state.dailyCalories = action.payload.reduce((total, meal) => total + meal.calories, 0);
    },
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.meals.push(action.payload);
      state.dailyCalories += action.payload.calories;
    },
    removeMeal: (state, action: PayloadAction<string>) => {
      const meal = state.meals.find((m) => m.id === action.payload);
      if (meal) {
        state.dailyCalories -= meal.calories;
        state.meals = state.meals.filter((m) => m.id !== action.payload);
      }
    },
    updateWaterIntake: (state, action: PayloadAction<number>) => {
      state.waterIntake = action.payload;
    },
  },
});

export const { setMeals, addMeal, removeMeal, updateWaterIntake } = nutritionSlice.actions;
export default nutritionSlice.reducer; 