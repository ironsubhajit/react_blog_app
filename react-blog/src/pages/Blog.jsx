import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/user-service";

const Blog = () => {
  return isUserLoggedIn() ? <Outlet/> : <Navigate to={'/login'} />;
};

export default Blog;
