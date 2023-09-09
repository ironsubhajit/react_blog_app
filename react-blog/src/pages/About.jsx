import React from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Base>
        <h1>This is about page</h1>
        <Link to={`/`}>Home page</Link>
      </Base>
    </div>
  );
};

export default About;
