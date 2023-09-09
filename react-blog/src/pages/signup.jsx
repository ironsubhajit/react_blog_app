import React, { useState } from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";
import validator from "validator";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Container,
  CardHeader,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

const Signup = () => {
  const defaultUserState = {
    name: "",
    email: "",
    password: "",
    about: "",
  };

  const defaultErrorState = {
    nameError: [],
    emailError: [],
    passwordError: [],
    isError: false,
  };

  // User state data
  const [userStateData, setUserStateData] = useState({
    ...defaultUserState,
  });

  // Error state
  const [errorStateData, setErrorStateData] = useState({
    ...defaultErrorState,
  });

  // signup validators
  const signupFormValidator = () => {
    const newErrors = {
      ...defaultErrorState,
    };

    // Name - empty validation
    if (validator.isEmpty(userStateData?.name)) {
      newErrors.nameError.push("Name is required");
      newErrors.isError = true;
    }
    // Name - length validation
    if (!validator.isLength(userStateData?.name, { min: 2 })) {
      newErrors.nameError.push("Name must be at least 2 characters long");
      newErrors.isError = true;
    }
    // email validation
    if (!validator.isEmail(userStateData?.email)) {
      newErrors.emailError.push("Invalid email address");
      newErrors.isError = true;
    }
    // Password - length validation
    if (!validator.isLength(userStateData?.password, { min: 6 })) {
      newErrors.passwordError.push(
        "Password must be at least 6 characters long"
      );
      newErrors.isError = true;
    }

    return errorStateData?.isError;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setUserStateData({ ...userStateData, [key]: event?.target?.value });
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setUserStateData({ ...defaultUserState });
  };

  // Submit signup form
  const submitSignUpForm = (event) => {
    event.preventDefault();


    // data validation - client side
    if (signupFormValidator()) {
      return;
    }
    console.log(userStateData);

    // add errors to check

    // invoke server api

    // check and redirect to all blog list page
  };

  return (
    <div>
      <Base>
        <Container className="d-flex justify-content-center align-items-center">
          <Card
            color="light"
            style={{
              width: "45rem",
            }}
            className="m-2"
          >
            <CardHeader>
              <CardTitle tag="h3">Sign Up</CardTitle>
              <CardSubtitle className="mb-2" tag="h6">
                Please sign up to create new blogs !
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              {/* Signup form */}
              <Form onSubmit={(e) => submitSignUpForm(e)}>
                {/* Name field */}
                <FormGroup>
                  <Label for="name">Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter a name"
                    type="text"
                    required
                    onChange={(e) => handleInputChange(e, "name")}
                    value={userStateData?.name}
                    invalid={errorStateData?.nameError ? true : false}
                  />
                  <FormFeedback>{ errorStateData?.nameError[0] }</FormFeedback>
                </FormGroup>
                {/* Email field */}
                <FormGroup>
                  <Label for="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter an Email Id"
                    type="email"
                    required
                    onChange={(e) => handleInputChange(e, "email")}
                    value={userStateData.email}
                  />
                  <FormFeedback>Error in this field</FormFeedback>
                </FormGroup>
                {/* Password field */}
                <FormGroup>
                  <Label for="password">Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter a password"
                    type="password"
                    required
                    onChange={(e) => handleInputChange(e, "password")}
                    value={userStateData.password}
                  />
                  <FormFeedback>Error in this field</FormFeedback>
                </FormGroup>
                {/* About field */}
                <FormGroup>
                  <Label for="about">About yourself</Label>
                  <Input
                    id="about"
                    name="about"
                    type="textarea"
                    placeholder="Describe yourself..."
                    onChange={(e) => handleInputChange(e, "about")}
                    value={userStateData.about}
                  />
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    {/* submit btn */}
                    <Button color="dark" type="submit" className="m-1">
                      Sign up
                    </Button>
                    {/* Reset btn */}
                    <Button
                      onClick={resetSignUpForm}
                      color="secondary"
                      type="reset"
                      className="m-1"
                    >
                      Reset
                    </Button>
                  </Container>
                  <CardText className="mt-2">
                    Already have an account ? Please{" "}
                    <Link to={`/login`}>Login</Link>
                  </CardText>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Base>
    </div>
  );
};

export default Signup;
