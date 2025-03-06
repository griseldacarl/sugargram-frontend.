import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  name: null,
  token: null,
  isAuthenticated: false,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, actions) => {
      state.id = actions.payload.id;
      state.name = actions.payload.name;
      state.email = actions.payload.email;
      state.token = actions.payload.token;
      state.isAuthenticated = actions.payload.isAuthenticated;
    },
    setCurrentUserLogout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setCurrentUserLogout } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
