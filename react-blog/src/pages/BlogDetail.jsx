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
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBlogs } from "../redux-state/actions/actions";

const BlogDetail = () => {
  const { blogId } = useParams();

  const blogs = useSelector((state) => state?.blogs?.blogs);
  const dispatch = useDispatch();

  if (blogs?.length == 0) {
    // state's list is empty
    dispatch(getBlogs());
  }

  const blog = blogs?.find((blog) => blog?._id === blogId);

  if (!blog) {
    toast.error("No blog found!");
    navigate("/");
  }

  console.log("Blog: ", blog);

  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  const modalProps = {
    centered: true,
  };
  const navigate = useNavigate();

  const toggle = () => setdeleteModalIsOpen(!deleteModalIsOpen);

  const deleteBlog = () => {
    console.log("deleting blog...");
    // invoke server to delete this blog
  };

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
                          <small className="text-muted">
                            Posted by @{blog?._id}
                          </small>
                        </Col>
                        <Col
                          md={{
                            size: 2,
                          }}
                        >
                          <Button
                            style={{ borderRadius: "30%" }}
                            outline
                            className="mx-1"
                            color="dark"
                            tag={ReactNavLink}
                            to={`/blog/${blog?._id}/edit`}
                          >
                            <span
                              style={{ fontSize: "1rem" }}
                              class="material-symbols-rounded"
                            >
                              edit
                            </span>
                          </Button>
                          <Button
                            style={{ borderRadius: "30%" }}
                            outline
                            className="mx-1"
                            color="danger"
                            onClick={toggle}
                          >
                            <span
                              style={{ fontSize: "1.2rem" }}
                              class="material-symbols-rounded"
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
                                onClick={deleteBlog}
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
                      <h1>{blog?.title} </h1>
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
