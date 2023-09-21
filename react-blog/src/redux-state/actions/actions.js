import { blogsList } from "../../services/blogs-service";
import  * as actionType  from "./action-types";


// Redux actions for blogs
export const getBlogs = () => {
  return async (dispatch) => {
    dispatch({
      type: actionType.GET_BLOGS_REQUEST
    })
    try {
      const response = await blogsList();
      dispatch({
        type: actionType.GET_BLOGS_SUCCESS,
        payload: response
      })
    } catch (error) {
      // Handling any errors
      dispatch({
        type: actionType.GET_BLOGS_ERROR,
        error
      });
    }
  }
}



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
