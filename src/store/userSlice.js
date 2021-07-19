import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignedIn: false,
  Username: null,
  email: null,
  searchInput: "tech",
  blogData: null,
  modal: false,
  senddata: false,
  blogpage: false,
};

const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    setUserData: (state, action) => {
      state.Username = action.payload[0];
      state.email = action.payload[1];
    },
    setInput: (state, action) => {
      state.searchInput = action.payload;
    },

    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setModalstate: (state, action) => {
      state.modal = action.payload;
    },
    sendDatatoFire: (state, action) => {
      state.senddata = action.payload;
    },
    getBlogpage: (state, action) => {
      state.blogpage = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
