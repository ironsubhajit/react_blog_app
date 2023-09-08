import React from "react";
import Base from "../components/Base";
import { Outlet, Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Base>This is about page</Base>
      <Link to={`/`}>Home page</Link>
    </div>
  );
};

export default About;
