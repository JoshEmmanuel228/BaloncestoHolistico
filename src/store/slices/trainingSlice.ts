import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  rest: string;
}

interface TrainingState {
  exercises: Exercise[];
  currentWorkout: Exercise[];
}

const initialState: TrainingState = {
  exercises: [],
  currentWorkout: [],
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {
    setExercises: (state, action: PayloadAction<Exercise[]>) => {
      state.exercises = action.payload;
    },
    addToWorkout: (state, action: PayloadAction<Exercise>) => {
      state.currentWorkout.push(action.payload);
    },
    removeFromWorkout: (state, action: PayloadAction<string>) => {
      state.currentWorkout = state.currentWorkout.filter(
        (exercise) => exercise.id !== action.payload
      );
    },
    clearWorkout: (state) => {
      state.currentWorkout = [];
    },
  },
});

export const { setExercises, addToWorkout, removeFromWorkout, clearWorkout } = trainingSlice.actions;
export default trainingSlice.reducer; 