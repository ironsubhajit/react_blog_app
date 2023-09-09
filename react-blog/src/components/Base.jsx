import React from "react";
import SiteNavbar from "./SiteNavbar";
import { Container } from "reactstrap";

const Base = ({ title = "Welcome to our website", children }) => {
  return (
    <div>
      <SiteNavbar />
      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
};

export default Base;
