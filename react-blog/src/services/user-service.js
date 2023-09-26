import { axiosConnect } from "./helper";

const SIGN_UP_API_URL = "/api/user/signup";
const LOGIN_API_URL = "/api/user/login";
const FETCH_USER_BY_ID_API_URL = "/api/user/fetch";
const FETCH_USERS_API_URL = "/api/user/all";

export const userSignUp = (signUpFormData) => {
  console.warn("signup form data: ", signUpFormData);
  return axiosConnect
    .post(SIGN_UP_API_URL, signUpFormData)
    .then((res) => res?.data);
};

export const userLogin = (loginFormData) => {
  console.warn("login form data: ", loginFormData);
  return axiosConnect
    .post(LOGIN_API_URL, loginFormData)
    .then((res) => res?.data);
};

export const isUserLoggedIn = () => {
  return !!localStorage.getItem("AUTH_TOKEN") && !!localStorage.getItem("user");
};

export const userLogout = (next) => {
  localStorage.removeItem("AUTH_TOKEN");
  localStorage.removeItem("user");
  next();
};

export const getUserDetails = () => {
  if (isUserLoggedIn) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    console.error("user details not found");
    return;
  }
};

export const fetchUserByID = async (_id) => {
  // fetching user details by user id
  try {
    console.log("user _id: ", _id);
    return await axiosConnect
      .post(FETCH_USER_BY_ID_API_URL, _id)
      .then((res) => res);
  } catch (error) {
    console.error("Error while fetching user by id: ", error);
    return;
  }
};

export const fetchAllUser = async () => {
  // fetching user details by user id
  try {
    return await axiosConnect
      .get(FETCH_USERS_API_URL)
      .then((res) => res?.data);
  } catch (error) {
    console.error("Error while fetching user by id: ", error);
    return;
  }
};
