// store.js
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../reducers/blogReducer";

const rootReducer = combineReducers({
  blogs: blogsReducer,
  // Add other reducers
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
