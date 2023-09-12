import React, { useState } from "react";
import { NavLink as ReactNavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

const SiteNavbar = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark full="true" expand="md">
        <NavbarBrand tag={ReactNavLink} to={`/`}>
          React Blog
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactNavLink} to={`/blogs`}>
                All Blogs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to={`/add-blog`}>
                New Post
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactNavLink} to={`/about`}>
                About
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink tag={ReactNavLink} to={`/login`}>
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to={`/logout`}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>User Name</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default SiteNavbar;
