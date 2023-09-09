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
} from "reactstrap";

const Login = () => {
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
              <CardTitle tag="h3">Login</CardTitle>
              <CardSubtitle className="mb-2" tag="h6">
                Please login to create new blogs !
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              {/* Login form */}
              <Form>
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

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    <Button color="dark" type="submit" className="m-1">Login</Button>
                    <Button color="secondary" type="reset" className="m-1">Reset</Button>
                  </Container>
                  <CardText className="mt-2">
                    Don't have an account ? Please <Link to={`/signup`}>Sign up</Link>
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
