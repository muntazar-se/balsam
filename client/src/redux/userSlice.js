// userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    reloadUser: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/user/profile"); // Adjust the API endpoint as needed
    dispatch(setUser(response.data));
  } catch (error) {
    // Handle error if needed
  }
};

export const selectUser = (state) => state.user.user;
