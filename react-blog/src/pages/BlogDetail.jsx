import React from "react";
import Base from "../components/Base";

import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  CardImg
} from "reactstrap";

const BlogDetail = () => {
  return (
    <div>
      <Base>
        <div className="blog-detail-page">
          <Container>
            <Card className="my-2">
              <CardImg
                alt="Card image cap"
                src="https://picsum.photos/900/180"
                // src="https://c0.wallpaperflare.com/preview/728/375/731/aerial-analog-background-blog.jpg"
                style={{
                  width: "100%",
                  height: 'auto',
                }}
                top
              />
              <CardBody>
                <CardTitle tag="h2">blogPost.title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer. blogPost.content
                </CardText>
                <CardText>
                  <small className="text-muted">posted by @username</small>
                </CardText>
              </CardBody>
            </Card>
            {/* <Card className="blog-card shadow">
              <CardBody>
                <CardTitle className="blog-card-title" tag="h1">blogPost.title</CardTitle>
                <CardText className="blog-card-text">blogPost.content</CardText>
                <Button color="primary" className="mx-2">
                  Edit
                </Button>
                <Button color="danger">Delete</Button>
              </CardBody>
            </Card> */}
          </Container>
        </div>
      </Base>
    </div>
  );
};

export default BlogDetail;
