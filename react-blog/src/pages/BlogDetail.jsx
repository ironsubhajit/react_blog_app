import React, { useState } from "react";
import Base from "../components/Base";
import {
  NavLink as ReactNavLink,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  CardTitle,
  Badge,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../redux-state/actions/actions";
import { updateBlogLikeCount } from "../services/blogs-service";
import { toast } from "react-toastify";
import { useBlogContext } from "../context-api/BlogContext";
import * as actionTypes from "../context-api/actionType";
import { getUserDetails } from "../services/user-service";

const BlogDetail = () => {
  const { blogId } = useParams();
  // const blogsContextData = useContext(BlogsContext);
  const { state, dispatch } = useBlogContext();
  const blogs = useSelector((state) => state?.blogs?.blogs);
  const reduxDispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = getUserDetails();

  if (blogs?.length === 0) {
    // state's list is empty
    reduxDispatch(getBlogs());
  }

  // Finding current blog on the redux state
  const blog = blogs?.find((blog) => blog?._id === blogId);

  // Finding current blog using contextApi
  const currentBlogtUsingContext = state?.blogs?.find(
    (blog) => blog?._id === blogId
  );

  if (!blog) {
    navigate("/");
  }

  console.log("Blog: ", blog);

  // Update Like count function. both: like & dislike
  const updateLikeCount = async (blogId, ctx) => {
    if (ctx === "like") {
      await updateBlogLikeCount(blogId);
      dispatch({ type: actionTypes.INCREMENT_LIKES, payload: blogId });
    } else {
      // False params tells function to decrement like count
      await updateBlogLikeCount(blogId, false);
      dispatch({ type: actionTypes.DECREMENT_LIKES, payload: blogId });
    }
  };

  // Delete Modal
  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);

  const toggle = () => setdeleteModalIsOpen(!deleteModalIsOpen);

  const confirmDeleteBlog = async (blogId) => {
    try {
      await reduxDispatch(deleteBlog(blogId));
      toast.success("Blog deleted successfully !");
      navigate("/blog/list");
    } catch (error) {
      toast.error("Something went wrong !");
      console.warn("Error while deleting blog: ", error);
    }
  };

  // CSS Props for the UI
  const modalProps = {
    centered: true,
  };

  const badgeStyle = {
    fontSize: "1rem",
    padding: "0.2rem 0.5rem",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
  };
  // CSS props ends here

  return (
    <div>
      <Base>
        <Container className="mt-4">
          <Row>
            <Col
              md={{
                size: 12,
              }}
            >
              <Card className="mt-3 ps-2 border-0 shadow-sm">
                {blog && (
                  <CardBody>
                    <CardText className="mb-0">
                      <Row>
                        <Col
                          md={{
                            size: 10,
                          }}
                        >
                          <small className="text-muted">Blog Posted</small>
                        </Col>
                        {/* Checking only blog owner can edit or delete post */}
                        {blog?.userId == loggedInUser?._id && (
                          <Col
                            md={{
                              size: 2,
                            }}
                          >
                            <Button
                              style={{ borderRadius: "30%" }}
                              outline
                              className="m-1"
                              color="dark"
                              tag={ReactNavLink}
                              to={`/blog/${blog?._id}/edit`}
                            >
                              <span
                                style={{ fontSize: "1rem" }}
                                className="material-symbols-rounded"
                              >
                                edit
                              </span>
                            </Button>
                            <Button
                              style={{ borderRadius: "30%" }}
                              outline
                              className="m-1"
                              color="danger"
                              onClick={toggle}
                            >
                              <span
                                style={{ fontSize: "1.2rem" }}
                                className="material-symbols-rounded"
                              >
                                delete
                              </span>
                            </Button>
                            {/* Delete Confirm modal */}
                            <Modal
                              isOpen={deleteModalIsOpen}
                              toggle={toggle}
                              {...modalProps}
                            >
                              <ModalHeader toggle={toggle}>
                                Blog Delete Confirmation
                              </ModalHeader>
                              <ModalBody>
                                Are you sure you want to delete this blog post ?
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  outline
                                  color="danger"
                                  onClick={() => confirmDeleteBlog(blog?._id)}
                                >
                                  Delete
                                </Button>{" "}
                                <Button
                                  outline
                                  color="secondary"
                                  onClick={toggle}
                                >
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </Col>
                        )}
                      </Row>
                    </CardText>

                    <CardText>
                      <span className="text-muted">
                        Category: {blog?.category}
                      </span>
                    </CardText>

                    <div
                      className="divder"
                      style={{
                        width: "100%",
                        height: "0.0937rem",
                        background: "#e2e2e2",
                      }}
                    ></div>

                    <CardTitle className="mt-3">
                      <Row>
                        <Col
                          md={{
                            size: 10,
                          }}
                        >
                          <div style={containerStyle}>
                            <h1>{blog?.title}</h1>
                            <Badge
                              className="mx-2"
                              style={badgeStyle}
                              pill
                              color="primary"
                            >
                              likes: {currentBlogtUsingContext?.likes}
                            </Badge>
                          </div>
                        </Col>
                        <Col
                          md={{
                            size: 2,
                          }}
                        >
                          <Button
                            style={{ borderRadius: "10%" }}
                            outline
                            className="m-1"
                            color="success"
                            onClick={() =>
                              updateLikeCount(
                                currentBlogtUsingContext?._id,
                                "like"
                              )
                            }
                          >
                            <div style={containerStyle}>
                              <span
                                style={{ fontSize: "1.2rem" }}
                                className="material-symbols-rounded"
                              >
                                thumb_up
                              </span>
                            </div>
                          </Button>
                          <Button
                            style={{ borderRadius: "10%" }}
                            onClick={() =>
                              updateLikeCount(
                                currentBlogtUsingContext?._id,
                                "dislike"
                              )
                            }
                            outline
                            className="m-1"
                            color="dark"
                          >
                            <div style={containerStyle}>
                              <span
                                style={{ fontSize: "1.2rem" }}
                                className="material-symbols-rounded"
                              >
                                thumb_down
                              </span>
                            </div>
                          </Button>
                        </Col>
                      </Row>
                    </CardTitle>
                    <div
                      className="image-container  mt-4 shadow  "
                      style={{ maxWidth: "50%" }}
                    >
                      <img
                        className="img-fluid"
                        src={blog?.imageUrl}
                        alt="Blog thumbnail"
                      />
                    </div>
                    <CardText
                      className="mt-5"
                      dangerouslySetInnerHTML={{ __html: blog?.content }}
                    ></CardText>
                  </CardBody>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    </div>
  );
};

export default BlogDetail;
