import React, { createContext, useContext, useReducer, useEffect } from "react";
import { blogsList } from "../services/blogs-service";
import * as actionTypes from "./actionType";

const initialState = {
  blogs: [], // Initialize with an empty array of blogs
};

const BlogsContext = createContext();

// Reducer function to handle state changes
const blogsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_BLOGS:
      return { ...state, blogs: action.payload };
    case actionTypes.INCREMENT_LIKES:
      // Find the blog to update by ID
      const updatedBlogs = state?.blogs?.map((blog) =>
        blog?._id === action.payload
          ? { ...blog, likes: blog?.likes + 1 }
          : blog
      );
      return { ...state, blogs: updatedBlogs };
    case actionTypes.DECREMENT_LIKES:
      // Find the blog to update by ID
      const newBlogs = state?.blogs?.map((blog) =>
        blog?._id === action.payload
          ? { ...blog, likes: blog?.likes - 1 }
          : blog
      );
      return { ...state, blogs: newBlogs };
    default:
      return state;
  }
};

// BlogContextProvider component
export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, initialState);

  useEffect(() => {
    // API call to fetch blog data
    const fetchData = async () => {
      const response = await blogsList();
      const blogsData = response;
      dispatch({ type: actionTypes.SET_BLOGS, payload: blogsData });
    };

    fetchData();
  }, []);

  return (
    <BlogsContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogsContext.Provider>
  );
};

// Custom hook to access the context
export const useBlogContext = () => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogContextProvider");
  }
  return context;
};
