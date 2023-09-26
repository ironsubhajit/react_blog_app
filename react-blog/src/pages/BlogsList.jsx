import React, { useEffect } from "react";
import Base from "../components/Base";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  CardImg,
  Button,
  Row,
  Col,
  NavLink
} from "reactstrap";
import { NavLink as ReactNavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux-state/actions/actions";
import { GET_BLOG } from "../redux-state/actions/action-types";


const BlogsList = () => {

  const dispatch = useDispatch();
  const blogList = useSelector((state) => state?.blogs?.blogs);
  const error = useSelector((state) => state?.blogs?.error);

  useEffect(() => {
    // Fetch blogs when the component mounts
    dispatch(getBlogs());
  }, [dispatch]);

  const setSelectedBlogData = (blog) => {
    dispatch({
      type: GET_BLOG,
      payload: blog,
    });
  }

  return (
    <div>
      <Base>
        <Row className="d-flex flex-wrap">
          {blogList?.map((card, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <Card outline key={index} className="m-2">
                {/* todo: change image url with db res */}
                <CardImg
                  alt="Blog image"
                  src={card?.imageUrl}
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle tag="h3">{card?.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {card?.category}
                  </CardSubtitle>
                  <CardText
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    className="ellipsis"
                  >
                    {card?.content}
                  </CardText>
                  <Button
                    style={{
                      width: "100%",
                    }}
                    color="dark"
                    onClick={() => setSelectedBlogData(card)}
                  >
                    <NavLink tag={ReactNavLink} to={`/blog/${card?._id}/view`}>
                      Read More
                    </NavLink>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Base>
    </div>
  );
};

export default BlogsList;
