import React, { useEffect, useState } from "react";
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
// import { editBlog } from "../services/blogs-service";
import { useDispatch, useSelector } from "react-redux";
import { editBlog, getBlogs } from "../redux-state/actions/actions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { blogId } = useParams();

  const blogs = useSelector((state) => state?.blogs?.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (blogs?.length === 0) {
    // populating state
    dispatch(getBlogs());
  }

  const blog = blogs?.find((blog) => blog?._id === blogId);

  if (!blog) {
    navigate("/");
  }

  const defaultNewBlogDataState = {
    _id: "",
    title: "",
    imageUrl: "",
    category: "",
    content: "",
    likes: "",
    userId: "",
  };

  const defaultErrorState = {
    titleErrors: [],
    contentErrors: [],
  };

  // User state data
  const [newBlogStateData, setNewBlogStateData] = useState({
    ...blog,
  });

  // Error state
  const [errorStateData, setErrorStateData] = useState({
    ...defaultErrorState,
  });

  // blog form validators
  const blogFormValidator = (key) => {
    // Name - empty validation
    if (key === "title") {
      if (
        validator?.isEmpty(newBlogStateData?.[key]) ||
        newBlogStateData?.[key]?.length < 3
      ) {
        setErrorStateData({
          ...errorStateData,
          titleErrors: ["Name must be at least 4 characters long"],
        });
      } else {
        setErrorStateData({ ...errorStateData, titleErrors: [] });
      }
    }
    // Blog content - length validation
    if (key === "content") {
      if (!validator?.isLength(newBlogStateData?.[key], { min: 49 })) {
        setErrorStateData({
          ...errorStateData,
          contentErrors: ["Blog content must be at least 50 characters long"],
        });
      } else {
        setErrorStateData({ ...errorStateData, contentErrors: [] });
      }
    }
    return;
  };

  // Set changed input field value in the user state data
  const handleInputChange = (event, key) => {
    setNewBlogStateData({ ...newBlogStateData, [key]: event?.target?.value });
    blogFormValidator(key);
  };

  // Reset user signup form
  const resetSignUpForm = () => {
    setNewBlogStateData({ ...defaultNewBlogDataState });
  };

  // Submit signup form
  const submitBlogForm = async (event) => {
    event.preventDefault();
    await dispatch(editBlog(newBlogStateData));
    toast.success("Blog updated successfully!");
    navigate(`/blog/${blogId}/view`);
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
            className="m-2 shadow"
          >
            <CardHeader>
              <CardTitle tag="h3">Edit Blog blog</CardTitle>
              <CardSubtitle className="mb-2" tag="h6">
                Please fill the details to edit the blog blog ! <br />
              </CardSubtitle>
            </CardHeader>
            <CardBody>
              {/* blog form */}
              <Form onSubmit={(e) => submitBlogForm(e)}>
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
                    defaultValue={blog?.title}
                    invalid={
                      errorStateData?.titleErrors?.length > 0 ? true : false
                    }
                  />
                  <FormFeedback>{errorStateData?.titleErrors[0]}</FormFeedback>
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
                    defaultValue={blog?.category}
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
                    defaultValue={blog?.imageUrl}
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
                    defaultValue={blog?.content}
                    invalid={
                      errorStateData?.contentErrors?.length > 0 ? true : false
                    }
                    style={{
                      height: "10rem",
                      overflowY: "visible",
                    }}
                  />
                  <FormFeedback>
                    {errorStateData?.contentErrors[0]}
                  </FormFeedback>
                </FormGroup>

                <Container className="button-section d-flex flex-column align-items-center">
                  <Container className="text-center">
                    {/* publish btn */}
                    <Button color="dark" type="submit" className="m-1">
                      Update
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

export default UpdateBlog;
