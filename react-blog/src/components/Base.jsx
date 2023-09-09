import React from "react";
import SiteNavbar from "./SiteNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div>
      <SiteNavbar />
      {children}
    </div>
  );
};

export default Base;
