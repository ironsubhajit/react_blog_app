import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import { blogsList } from "../services/blogs-service";

const BlogsList = () => {
  const defaultBlogsState = {
    blogs: [],
  };

  // User state data
  const [blogsStateData, setBlogsStateData] = useState({
    ...defaultBlogsState,
  });

  const getBlogs = () => {
    // invoke server api
    blogsList()
      .then((res) => {
        console.log(res);
        console.log("Sucess log");
        // set blog state
        setBlogsStateData({ ...blogsStateData, blogs: res });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <Base>
        <Row className="d-flex flex-wrap">
          {blogsStateData?.blogs?.map((card, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <Card outline key={index} className="m-2">
                {/* todo: change image url with db res */}
                <CardImg
                  alt="Card image cap"
                  src="https://c0.wallpaperflare.com/preview/728/375/731/aerial-analog-background-blog.jpg"
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
                  >
                    Read More
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
