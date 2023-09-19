import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
import reportWebVitals from "./reportWebVitals";
import BlogsList from "./pages/BlogsList";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogDetail from "./pages/BlogDetail";
import Blog from "./pages/Blog";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/blog/list",
    element: <BlogsList />,
  },
  {
    path: "/blog/:blogId/view",
    element: <BlogDetail />,
  },
  {
    path: "/blog",
    element: <Blog />,
    children: [
      {
        path: "create",
        element: <CreateBlog />,
      },
      {
        path: ":blogId/edit",
        element: <UpdateBlog />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// Dev server o strict mode
// root.render(
//   <React.StrictMode>
//     <ToastContainer position="top-center" />
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
// Prod server
root.render(
  <>
    <ToastContainer position="top-center" />
    <RouterProvider router={router} />
  </>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
