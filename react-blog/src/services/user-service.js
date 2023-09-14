import { axiosConnect } from "./helper";


const SIGN_UP_API_URL = '/api/user/signup';
const LOGIN_API_URL = '/api/user/login';

export const userSignUp = (signUpFormData) => {
    console.warn("signup form data: ", signUpFormData);
    return axiosConnect.post(SIGN_UP_API_URL, signUpFormData).then((res) => res?.data)
}

export const userLogin = (loginFormData) => {
    console.warn("login form data: ", loginFormData);
    return axiosConnect.post(LOGIN_API_URL, loginFormData).then((res) => res?.data)
}