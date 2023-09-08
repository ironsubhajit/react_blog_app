import React from "react";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div>
      <h1>Nav bar</h1>
      {children}
      <h4>footer</h4>
    </div>
  );
};

export default Base;
