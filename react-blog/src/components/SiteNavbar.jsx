import React, { useEffect, useState } from "react";
import { NavLink as ReactNavLink, useNavigate } from "react-router-dom";

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
import { getUserDetails, isUserLoggedIn, userLogout } from "../services/user-service";


const defaultUserDetailsState = {
  "_id": undefined,
  "name": undefined,
  "email": undefined,
  "about": undefined,
  "role":undefined,
}

const SiteNavbar = (args) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  // user login status
  const [loginStatusState, setLoginStatusState] = useState(false);
  const [userDetailsState, setUserDetailsState] = useState({...defaultUserDetailsState});

  useEffect(() => {
    setLoginStatusState(isUserLoggedIn());
    if(isUserLoggedIn()) {
      setUserDetailsState(getUserDetails());
    }else {
      setUserDetailsState({...defaultUserDetailsState});
    }
  },[loginStatusState])

  // todo: need to refresh nav after logout
  const logout = () => {
    // logout user by remooving auth token from local storage
    userLogout(() => {
      setLoginStatusState(false);
    });
    navigate("/login");
  }

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
              <NavLink tag={ReactNavLink} to={`/blog/list`}>
                All Blogs
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactNavLink} to={`/blog/create`}>
                New Post
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={ReactNavLink} to={`/blog/view`}>
                Detail blog
              </NavLink>
            </NavItem> */}
            {/* <NavItem>
              <NavLink tag={ReactNavLink} to={`/about`}>
                About
              </NavLink>
            </NavItem> */}
            {loginStatusState ? (
              <NavItem>
                <NavLink onClick={logout}>
                  Logout
                </NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink tag={ReactNavLink} to={`/login`}>
                  Login
                </NavLink>
              </NavItem>
            )}
          </Nav>
          <NavbarText> { userDetailsState?.name }</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default SiteNavbar;
