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
    userId: "",
  };

  const defaultErrorState = {
    titleErrors: [],
    contentErrors: []
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
  const newBlogFormValidator = (key) => {
    // Name - empty validation
    if (key === "title") {
      if (
        validator?.isEmpty(newBlogStateData?.[key]) ||
        (newBlogStateData?.[key]?.length < 3 )
      ) {
        setErrorStateData({ ...errorStateData, titleErrors: ["Name must be at least 4 characters long"]})
      } else {
        setErrorStateData({ ...errorStateData, titleErrors: []})
      }
    }
    // Blog content - length validation
    if (key === "content") {
      if (!validator?.isLength(newBlogStateData?.[key], { min: 49 })) {
        setErrorStateData({ ...errorStateData, contentErrors: ["Blog content must be at least 50 characters long"]})
      } else {
        setErrorStateData({ ...errorStateData, contentErrors: []})
      }
    }
    return ;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setNewBlogStateData({ ...newBlogStateData, [key]: event?.target?.value });
    newBlogFormValidator(key);
    console.log(JSON.stringify(errorStateData));
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setNewBlogStateData({ ...defaultNewBlogDataState });
  };

  // Submit signup form
  const submitNewBlogForm = (event) => {
    event.preventDefault();

    // data validation - client side
    // if (newBlogFormValidator()) {
    //   return;
    // }
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
                    invalid={ errorStateData?.titleErrors?.length > 0 ? true : false }
                  />
                  <FormFeedback>{ errorStateData?.titleErrors[0] }</FormFeedback>
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
                    value={newBlogStateData?.content}
                    invalid={ errorStateData?.contentErrors?.length > 0 ? true : false }
                    style={{
                      height: "10rem",
                      overflowY: "visible",
                    }}
                  />
                  <FormFeedback>{  errorStateData?.contentErrors[0] }</FormFeedback>
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    {/* publish btn */}
                    <Button
                      color="dark"
                      type="submit"
                      className="m-1"
                    >
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
