import { axiosConnect } from "./helper";


const BLOGS_LIST_URL = '/api/blog/list';
const ADD_BLOG_URL = '/api/blog/add';

export const blogsList = () => {
    return axiosConnect.get(BLOGS_LIST_URL).then((res) => res?.data);
}

export const addBlog = (addBlogFormData) => {
    console.warn("add blog form data service: ", addBlogFormData);
    return axiosConnect.post(ADD_BLOG_URL, addBlogFormData).then((res) => res);
}