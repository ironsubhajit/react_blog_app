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
    case actionTypes?.ADD_BLOG_REQUEST:
      return {...state, loading: true, error: null};
    case actionTypes?.ADD_BLOG_SUCCESS:
      return {...state, blogs: [...state?.blogs, action?.payload], loading: false, error: null};
    case actionTypes?.ADD_BLOG_ERROR:
      return {...state, loading: false, error: action?.error};
    default:
      // console.log("Redux State called...");
      return state;
  }
}

export default blogsReducer;
