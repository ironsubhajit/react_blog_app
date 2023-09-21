import { toast } from "react-toastify";
import { addBlog, blogsList } from "../../services/blogs-service";
import * as actionTypes from "../actions/action-types";

// reducers.js
const initialBlogListState = {
  blogs: [],
  loading: false,
  error: null
};

function blogsReducer(state = initialBlogListState, action) {
  // Returns current state by action types 
  switch (action.type) {
    case actionTypes?.GET_BLOGS_REQUEST:
      return {...state, loading: true, error: null};
    case actionTypes?.GET_BLOGS_SUCCESS:
      return {...state, blogs: action?.payload, loading: false, error: null};
    case actionTypes?.GET_BLOGS_ERROR:
      return {...state, loading: false, error: action?.error};
    // case actionTypes?.ADD_BLOG:
    //   console.log("Add new blog...");
    //   // Add a new post to the state
    //   const newBlog = { ...action?.payload };
    //   // invoke server api
    //   // todo: 1. return error or success to the component
    //   // addBlog(newBlog)
    //   //   .then((res) => {
    //   //     console.log(res);
    //   //     console.log("Blog added successfully");
    //   //     // Update blogsList state
    //   //     return { ...state, blogs: [...state.blogs, newBlog] };
    //   //     // Navigate("/blogs");
    //   //   })
    //   //   .catch((error) => {
    //   //     console.log("error: ", error);
    //   //     toast.error(`Something went wrong ! Unable to create blog !`);
    //   //     // const data = error?.response?.data;
    //   //     // handleServerErrors(data);
    //   //   });
    //   return {...state, blogs: [...state.blogs, newBlog]};

    default:
      // console.log("Redux State called...");
      return state;
  }
}

export default blogsReducer;
