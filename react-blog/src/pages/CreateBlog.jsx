import React, { useState } from "react";
import Base from "../components/Base";
import validator from "validator";
import {
  Card,
  CardBody,
  CardTitle,
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

const CreateBlog = () => {
  const defaultNewBlogDataState = {
    title: "",
    imageUrl: "",
    category: "",
    content: "",
    likes: 0,
    userId: ""
  };

  const defaultErrorState = {
    errors: [],
    isError: false,
  };

  // User state data
  const [newBlogStateData, setNewBlogStateData] = useState({
    ...defaultNewBlogDataState,
  });

  // Error state
  const [errorStateData, setErrorStateData] = useState({
    ...defaultErrorState,
  });

  // signup validators
  const newBlogFormValidator = () => {
    const newErrors = {
      ...defaultErrorState,
    };

    // Name - empty validation
    if (validator.isEmpty(newBlogStateData?.title)) {
      newErrors.errors.push("Blog title is required");
      newErrors.isError = true;
    }
    // Name - length validation
    if (!validator.isLength(newBlogStateData?.title, { min: 2 })) {
      newErrors.errors.push("Name must be at least 2 characters long");
      newErrors.isError = true;
    }
    // Blog content - length validation
    if (!validator.isLength(newBlogStateData?.content, { min: 50 })) {
      newErrors.errors.push("Blog content must be at least 50 characters long");
      newErrors.isError = true;
    }
    
    return errorStateData?.isError;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setNewBlogStateData({ ...newBlogStateData, [key]: event?.target?.value });
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setNewBlogStateData({ ...defaultNewBlogDataState });
  };

  // Submit signup form
  const submitNewBlogForm = (event) => {
    event.preventDefault();

    // data validation - client side
    if (newBlogFormValidator()) {
      return;
    }
    console.log(newBlogStateData);

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
              width: "85%",
            }}
            className="m-2"
          >
            <CardHeader>
              <CardTitle tag="h3">Create New Blog</CardTitle>
              <CardSubtitle className="mb-2" tag="h6">
                Please fill the details to create new blog !
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              {/* Add new blog form */}
              <Form onSubmit={(e) => submitNewBlogForm(e)}>
                {/* title field */}
                <FormGroup>
                  <Label for="title">Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter a title"
                    type="text"
                    required
                    onChange={(e) => handleInputChange(e, "title")}
                    value={newBlogStateData?.title}
                  />
                  <FormFeedback>{errorStateData?.errors[0]}</FormFeedback>
                </FormGroup>
                {/* Category field */}
                <FormGroup>
                  <Label for="category">Category*</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Enter a category"
                    type="text"
                    required
                    onChange={(e) => handleInputChange(e, "category")}
                    value={newBlogStateData?.category}
                  />
                  <FormFeedback>{errorStateData?.errors[0]}</FormFeedback>
                </FormGroup>
                {/* image url field */}
                <FormGroup>
                  <Label for="imageUrl">Image url</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="Enter an url for blog thumbnail"
                    type="url"
                    required
                    onChange={(e) => handleInputChange(e, "imageUrl")}
                    value={newBlogStateData?.imageUrl}
                  />
                  <FormFeedback>Error in this field</FormFeedback>
                </FormGroup>
                {/* Blog conent field */}
                <FormGroup>
                  <Label for="content">Blog content *</Label>
                  <Input
                    id="content"
                    name="content"
                    type="textarea"
                    placeholder="Write blog content here..."
                    onChange={(e) => handleInputChange(e, "content")}
                    value={newBlogStateData.content}
                    style={{
                      height: "10rem",
                      overflowY: "visible"
                    }}
                  />
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    {/* publish btn */}
                    <Button disabled={errorStateData?.isError} color="dark" type="submit" className="m-1">
                      Publish
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
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </Base>
    </div>
  );
};

export default CreateBlog;
