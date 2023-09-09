import React from "react";
import Base from "../components/Base";
import { Outlet, Link } from "react-router-dom";
import SiteNavbar from "../components/SiteNavbar";

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
