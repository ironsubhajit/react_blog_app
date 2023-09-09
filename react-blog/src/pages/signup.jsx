import React from "react";
import Base from "../components/Base";
import { Link } from "react-router-dom";
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
  Label,
  Input,
  FormText,
} from "reactstrap";

const Signup = () => {
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
              <Form>
                <FormGroup>
                  <Label for="userName">Name*</Label>
                  <Input
                    id="userName"
                    name="userName"
                    placeholder="Enter a name"
                    type="text"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="userEmail">Email*</Label>
                  <Input
                    id="userEmail"
                    name="userEmail"
                    placeholder="Enter an Email Id"
                    type="email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password*</Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="Enter a password"
                    type="password"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="aboutUser">About yourself</Label>
                  <Input id="aboutUser" name="text" type="textarea" placeholder="Describe yourself..." />
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    <Button color="dark" type="submit" className="m-1">Sign up</Button>
                    <Button color="secondary" type="reset" className="m-1">Reset</Button>
                  </Container>
                  <CardText className="mt-2">
                    Already have an account ? Please <Link to={`/login`}>Login</Link>
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
