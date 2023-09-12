import React, { useState } from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { userSignUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const defaultUserState = {
    name: "",
    email: "",
    password: "",
    about: "",
    role: 1,
  };

  const defaultErrorState = {
    errors: {},
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
    setErrorStateData({ ...defaultErrorState });
    // Name - length validation
    if (!validator.isLength(userStateData?.name, { min: 2 })) {
      setUserStateData({
        ...errorStateData,
        nameError: ["Name must be at least 2 characters long"],
        isError: true,
      });
    }
    // email validation
    if (!validator.isEmail(userStateData?.email)) {
      setUserStateData({
        ...errorStateData,
        emailError: ["Invalid email address"],
        isError: true,
      });
    }
    // Password - length validation
    if (!validator.isLength(userStateData?.password, { min: 6 })) {
      setUserStateData({
        ...errorStateData,
        passwordError: ["Password must be at least 6 characters long"],
        isError: true,
      });
    }
    return errorStateData?.isError;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setUserStateData({ ...userStateData, [key]: event?.target?.value });
    if (key === "name") {
      // chack  client side name validation
    } else if (key === "email") {
      // check  client side email validation
    } else if (key === "password") {
      // check  client side password validation
    }
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setErrorStateData({ ...defaultErrorState });
    setUserStateData({ ...defaultUserState });
  };

  function handleServerErrors(errors) {
    errors.forEach((obj) => {
      const key = Object.values(obj)[0]; // Array of keys
      const value = Object.values(obj)[1]; // Array of values
      console.log("Key:", key);
      console.log("Value:", value);
      if (key === "email") {
        console.log("email error set to state...");
        setErrorStateData({
          ...errorStateData,
          emailError: [value],
          isError: true,
        });
      }
      if (key === "name") {
        console.log("name error set to state...");
        setErrorStateData({
          ...errorStateData,
          nameError: [value],
          isError: true,
        });
      }
      if (key === "password") {
        console.log("password error set to state...");
        setErrorStateData({
          ...errorStateData,
          passwordError: [value],
          isError: true,
        });
      }
    });

    // Success notification
    toast.error("User not registered !! try again !!");
    // setErrorStateData({...errorStateData, errors: error, isError: true})
  }

  // Submit signup form
  const submitSignUpForm = (event) => {
    event.preventDefault();
    console.log("comp sign up form data: ", userStateData);

    // invoke server api
    userSignUp(userStateData)
      .then((res) => {
        console.log(res);
        console.log(" sucess log");
        // redirect to login page
        navigate("/login");
        toast.success("User registered successfully !!");
        // reset state data
        userStateData = { ...defaultErrorState };
      })
      .catch((error) => {
        console.log("error: ");
        const data = error?.response?.data;
        handleServerErrors(data);
      });

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
                <br />
                {JSON.stringify(errorStateData)}
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
                    invalid={
                      errorStateData?.nameError?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>{errorStateData?.nameError[0]}</FormFeedback>
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
                    value={userStateData?.email}
                    invalid={
                      errorStateData?.emailError?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>{errorStateData?.emailError[0]}</FormFeedback>
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
                    value={userStateData?.password}
                    invalid={
                      errorStateData?.passwordError?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>
                    {errorStateData?.passwordError[0]}
                  </FormFeedback>
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
