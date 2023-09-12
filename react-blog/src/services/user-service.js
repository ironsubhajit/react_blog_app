import { axiosConnect } from "./helper";


const SIGN_UP_API_URL = '/api/user/signup';

export const userSignUp = (signUpFormData) => {
    console.warn("signup form data: ", signUpFormData);
    return axiosConnect.post(SIGN_UP_API_URL, signUpFormData).then((res) => res?.data)
}