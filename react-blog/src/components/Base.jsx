import React from "react";
import SiteNavbar from "./SiteNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div>
      <SiteNavbar />
      {children}
      <h4>footer</h4>
    </div>
  );
};

export default Base;
