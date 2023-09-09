import React from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Base>
        <h1>This is login page</h1>
        <Link to={`/signup`}>Sign up page</Link>
      </Base>
    </div>
  );
};

export default Login;
