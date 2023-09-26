import * as blogService from "../../services/blogs-service";
import * as actionType from "./action-types";

// Redux actions for blogs
export const getBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: actionType.GET_BLOGS_REQUEST,
    });
    try {
      // Service call
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

export const getBlog = (blogId) => {
  return async (dispatch) => {
    dispatch({
      type: actionType.API_REQUEST
    });
    try {
      // Service Call
      const response = await blogService?.getBlog(blogId);
      dispatch({
        type: actionType.GET_BLOG,
        payload: response,
      });
    } catch (error) {
      // Handling any errors
      dispatch({
        type: actionType.ERROR,
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

export const editBlog = (updatedBlogData) => {
  return async (dispatch) => {
    dispatch({
      type: actionType?.API_REQUEST,
    });
    await blogService?.editBlog(updatedBlogData)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionType?.EDIT_BLOG,
          payload: updatedBlogData,
        });
      })
      .catch((error) => {
        console.warn("error: ", error);
        // Adding error to state's error field
        dispatch({
          type: actionType.ERROR,
          payload: error
        })
      });
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    dispatch({
      type: actionType?.API_REQUEST,
    });
    await blogService?.deleteBlog(blogId)
      .then((res) => {
        console.log(res);
        if (res?.acknowledged) {
          dispatch({
            type: actionType?.DELETE_BLOG,
            payload: blogId,
          });
        }
      })
      .catch((error) => {
        console.warn("error: ", error);
        // Adding error to state's error field
        dispatch({
          type: actionType.ERROR,
          payload: error
        })
      });
  };
};



