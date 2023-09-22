import * as blogService from "../../services/blogs-service";
import * as actionType from "./action-types";

// Redux actions for blogs
export const getBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: actionType.GET_BLOGS_REQUEST,
    });
    try {
      const response = await blogService?.blogsList();
      dispatch({
        type: actionType.GET_BLOGS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      // Handling any errors
      dispatch({
        type: actionType.GET_BLOGS_ERROR,
        error,
      });
    }
  };
};

// Redux actions for blogs
export const addBlog = (newBlogData) => {
  return async (dispatch) => {
    dispatch({
      type: actionType?.ADD_BLOG_REQUEST,
    });
    await blogService?.addBlog(newBlogData)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionType?.ADD_BLOG_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.warn("error: ", error);
        // Adding error to state's error field
        dispatch({
          type: actionType.ADD_BLOG_ERROR,
          payload: error
        })
      });
  };
};

// export const addBlog = (newBlogData) => ({
//   type: actionType.ADD_BLOG,
//   payload: newBlogData,
// });

// export const editBlog = (updatedBlogData) => ({
//   type: actionType.EDIT_BLOG,
//   payload: updatedBlogData,
// });

// export const deleteBlog = (blogId) => ({
//   type: actionType.DELETE_BLOG,
//   payload: blogId,
// });
