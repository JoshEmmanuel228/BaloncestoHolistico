import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import trainingReducer from './slices/trainingSlice';
import nutritionReducer from './slices/nutritionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    training: trainingReducer,
    nutrition: nutritionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 