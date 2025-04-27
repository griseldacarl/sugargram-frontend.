import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  name: null,
  token: null,
  isAuthenticated: false,
  activity: null,
  age: null,
  displayName: null,
  firstname: null,
  gender: null,
  height: null,
  lastname: null,
  notes: null,
  image: null,
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
      state.activity = actions.payload.activity;
      state.age = actions.payload.age;
      state.displayName = actions.payload.displayName;
      state.firstname = actions.payload.firstname;
      state.gender = actions.payload.gender;
      state.height = actions.payload.height;
      state.lastname = actions.payload.lastname;
      state.notes = actions.payload.notes;
      state.image = actions.payload.image;
    },
    setCurrentUserLogout: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
      state.activity = null;
      state.age = null;
      state.displayName = null;
      state.firstname = null;
      state.gender = null;
      state.height = null;
      state.lastname = null;
      state.notes = null;
      state.image = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setCurrentUserLogout } =
  currentUserSlice.actions;

export default currentUserSlice.reducer;
