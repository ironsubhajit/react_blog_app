import React from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Base>
        <h1>This is sign up page</h1>
        <Link to={`/login`}>Login page</Link>
      </Base>
    </div>
  );
};

export default Signup;
