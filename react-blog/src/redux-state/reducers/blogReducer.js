import * as actionTypes from "../actions/action-types";

// reducers.js
const initialBlogListState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

function blogsReducer(state = initialBlogListState, action) {
  // Returns current state by action types
  switch (action.type) {
    case actionTypes?.GET_BLOGS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes?.GET_BLOGS_SUCCESS:
      return { ...state, blogs: action?.payload, loading: false, error: null };
    case actionTypes?.GET_BLOGS_ERROR:
      return { ...state, loading: false, error: action?.error };

    case actionTypes?.API_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes?.ERROR:
      return { ...state, loading: false, error: action?.error };

    case actionTypes?.GET_BLOG:
      return {
        ...state,
        selectedBlog: action?.payload,
        loading: false,
        error: null,
      };

    case actionTypes?.ADD_BLOG_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes?.ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogs: [...state?.blogs, action?.payload],
        loading: false,
        error: null,
      };
    case actionTypes?.ADD_BLOG_ERROR:
      return { ...state, loading: false, error: action?.error };
    case actionTypes?.EDIT_BLOG:
      // Find the index of the blog to update
      const blogIndex = state.blogs.findIndex((blog) => blog._id === action.payload._id);

      if (blogIndex !== -1) {
        // Create a new array with the updated blog
        const updatedBlogs = [...state.blogs];
        updatedBlogs[blogIndex] = { ...updatedBlogs[blogIndex], ...action.payload };

        return {
          ...state,
          blogs: updatedBlogs,
          loading: false,
        error: null,
        };
      }
      return state
    case actionTypes?.DELETE_BLOG:
      // Filter out the blog to delete
      const deletedBlogIndex = state.blogs.findIndex((blog) => blog?._id === action?.payload);

      if (deletedBlogIndex !== -1) {
        const refreshBlogs = [...state.blogs.slice(0, deletedBlogIndex), ...state.blogs.slice(deletedBlogIndex + 1)];

        return {
          ...state,
          blogs: refreshBlogs,
        };
      }
      return state; // If the blog is not found, return the current state
    
    default:
      return state;
  }
}

export default blogsReducer;
