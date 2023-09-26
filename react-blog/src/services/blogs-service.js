import { axiosConnect } from "./helper";


const BLOGS_LIST_URL = '/api/blog/list';
const ADD_BLOG_URL = '/api/blog/add';

export const blogsList = () => {
    return axiosConnect.get(BLOGS_LIST_URL).then((res) => res?.data);
}

export const getBlog = async (blogId) => {
    const VIEW_BLOG_URL = `/api/blog/${blogId}/view`;
    return await axiosConnect.get(VIEW_BLOG_URL).then((res) => res?.data);
}

export const addBlog = (addBlogFormData) => {
    console.warn("add blog form data service: ", addBlogFormData);
    return axiosConnect.post(ADD_BLOG_URL, addBlogFormData).then((res) => res);
}
export const editBlog = (editedBlogData) => {
    const EDIT_BLOG_URL = `/api/blog/${editedBlogData?._id}/edit`;
    console.warn("add blog form data service: ", editedBlogData);
    return axiosConnect.patch(EDIT_BLOG_URL, editedBlogData).then((res) => res);
}
export const deleteBlog = (blogId) => {
    const REMOVE_BLOG_URL = `/api/blog/${blogId}/remove`;
    console.warn("blog id in service: ", blogId);
    return axiosConnect.delete(REMOVE_BLOG_URL, blogId).then((res) => res);
}