import { axiosConnect } from "./helper";


const BLOGS_LIST_URL = '/api/blog/list';
const ADD_BLOG_URL = '/api/blog/add';

export const blogsList = async () => {
    return await axiosConnect.get(BLOGS_LIST_URL).then((res) => res?.data);
}

export const getBlog = async (blogId) => {
    const VIEW_BLOG_URL = `/api/blog/${blogId}/view`;
    return await axiosConnect.get(VIEW_BLOG_URL).then((res) => res?.data);
}

export const addBlog = (addBlogFormData) => {
    console.warn("add blog form data service: ", addBlogFormData);
    return axiosConnect.post(ADD_BLOG_URL, addBlogFormData).then((res) => res);
}
export const editBlog = async (editedBlogData) => {
    const EDIT_BLOG_URL = `/api/blog/${editedBlogData?._id}/edit`;
    console.warn("add blog form data service: ", editedBlogData);
    return await axiosConnect.patch(EDIT_BLOG_URL, editedBlogData).then((res) => res);
}
export const deleteBlog = async (blogId) => {
    const REMOVE_BLOG_URL = `/api/blog/${blogId}/remove`;
    console.warn("blog id in service: ", blogId);
    return await axiosConnect.delete(REMOVE_BLOG_URL, blogId).then((res) => res?.data);
}
export const updateBlogLikeCount = async (blogId, like=true) => {
    // "Like" params tells the api to increase like to count if true else decrease like count 
    const UPDATE_LIKE_API_URL = `/api/blog/${blogId}/update/like`;
    console.warn("blog id in service: ", blogId);
    return await axiosConnect.patch(UPDATE_LIKE_API_URL, {blogId, like}).then((res) => res?.data);
}