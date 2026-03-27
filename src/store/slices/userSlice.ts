import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: User | null;
}

// Intentar cargar la sesión guardada del localStorage
const getSavedUser = (): User | null => {
  try {
    const saved = localStorage.getItem("athenaball_user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const savedUser = getSavedUser();

const initialState: UserState = {
  isAuthenticated: !!savedUser,
  user: savedUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem("athenaball_user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("athenaball_user");
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("athenaball_user");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;