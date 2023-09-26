import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import { Link, useNavigate } from "react-router-dom";
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
  Spinner
} from "reactstrap";
import validator from "validator";
import { toast } from "react-toastify";
import { userLogin } from "../services/user-service";

const Login = () => {
  const navigate = useNavigate();
  const defaultFormState = {
    email: "",
    password: "",
    isLoading: false,
  };

  const defaultErrorState = {
    errors: {},
    emailError: [],
    passwordError: [],
    isError: false,
  };

  // User state data
  const [formStateData, setFormStateData] = useState({
    ...defaultFormState,
  });

  // Error state
  const [errorStateData, setErrorStateData] = useState({
    ...defaultErrorState,
  });

  // Reset form
  const resetForm = () => {
    setErrorStateData({ ...defaultErrorState });
    setFormStateData({ ...defaultFormState });
  };

  // form validators - client side
  const formValidator = (key) => {
    // email - validation
    if (key === "email") {
      if (!validator.isEmail(formStateData?.[key])) {
        setErrorStateData({
          ...errorStateData,
          emailError: ["Invalid email address"],
          isError: [true],
        });
      } else {
        setErrorStateData({
          ...errorStateData,
          emailError: [],
          isError: [false],
        });
      }
    }
    // password - length validation
    if (key === "password") {
      if (!validator?.isLength(formStateData?.[key], { min: 5 })) {
        setErrorStateData({
          ...errorStateData,
          passwordError: ["Password must be at least 6 characters long"],
          isError: [true],
        });
      } else {
        setErrorStateData({
          ...errorStateData,
          passwordError: [],
          isError: [false],
        });
      }
    }
    return;
  };

  // Server Error handle
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
      if (key === "password") {
        console.log("password error set to state...");
        setErrorStateData({
          ...errorStateData,
          passwordError: [value],
          isError: true,
        });
      }
    });
  }

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setFormStateData({ ...formStateData, [key]: event?.target?.value });
    formValidator(key);
  };

  useEffect(() => {
    toast.info("Please login to create content !");
  }, []);

  // Submit login form
  const submitForm = (event) => {
    event.preventDefault();
    console.log("comp sign up form data: ", formStateData);

    // invoke service
    setFormStateData({ ...formStateData, isLoading: true });
    const { isLoading, ...loginCreadentials } = formStateData;
    console.log("log data", loginCreadentials)
    userLogin(loginCreadentials)
      .then((res) => {
        console.log(res);
        console.log("sucess log");
        localStorage.setItem("AUTH_TOKEN", JSON.stringify(res?.token));
        localStorage.setItem("user", JSON.stringify(res?.user));
        setFormStateData({ ...defaultFormState });
        // redirect to home page
        navigate("/");
        toast.success("User Logged in successfully !!");
        // reset state data
        setFormStateData({ ...defaultErrorState });
      })
      .catch((error) => {
        setFormStateData({ ...formStateData, isLoading: false });
        console.log("error: ", error);
        const data = error?.response?.data;
        handleServerErrors(data);
        toast.error("Login unsuccessfull !! try again !!");
      });
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
            className="m-2 shadow"
          >
            <CardHeader>
              <CardTitle tag="h3">Login</CardTitle>
              <CardSubtitle className="mb-2" tag="h6">
                Please login to create new blogs !
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              {/* Login form */}
              <Form onSubmit={(e) => submitForm(e)}>
                <FormGroup>
                  <Label for="email">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter an Email Id"
                    type="email"
                    required
                    onChange={(e) => handleInputChange(e, "email")}
                    value={formStateData?.email}
                    invalid={
                      errorStateData?.emailError?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>{errorStateData?.emailError[0]}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter a password"
                    type="password"
                    required
                    onChange={(e) => handleInputChange(e, "password")}
                    value={formStateData?.password}
                    invalid={
                      errorStateData?.passwordError?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>
                    {errorStateData?.passwordError[0]}
                  </FormFeedback>
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    <Button
                      color="dark"
                      disabled={formStateData?.isLoading ? true : false}
                      type="submit"
                      className="m-1"
                    >
                      {formStateData?.isLoading && (
                        <Spinner size="sm">Loading...</Spinner>
                      )}
                      <span> Login </span>
                    </Button>
                    {/* <Button color="dark" type="submit" className="m-1">
                      Login
                    </Button> */}
                    <Button
                      onClick={resetForm}
                      color="secondary"
                      type="reset"
                      className="m-1"
                    >
                      Reset
                    </Button>
                  </Container>
                  <CardText className="mt-2">
                    Don't have an account ? Please{" "}
                    <Link to={`/signup`}>Sign up</Link>
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

export default Login;
