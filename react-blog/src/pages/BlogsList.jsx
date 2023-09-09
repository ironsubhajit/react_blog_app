import React from "react";
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


const BlogsList = () => {
  // Demo blogs list data
  const cardsData = [
    {
      title: "Card 1",
      subtitle: "Tech",
      content:
        "Content for Card 1. Content for Card 1. Content for Card 1. Content for Card 1.Content for Card 1. .Content for Card 1. ",
    },
    {
      title: "Card 2",
      subtitle: "Tech",
      content:
        "Content for Card 2. Content for Card 2. Content for Card 2. Content for Card 2.Content for Card 2. Content for Card 2",
    },
    {
      title: "Card 3",
      subtitle: "Tech",
      content:
        "Content for Card 3. Content for Card 3. Content for Card 3. Content for Card 3.Content for Card 3. Content for Card 3",
    },
    {
      title: "Card 4",
      subtitle: "Tech",
      content:
        "Content for Card 4. Content for Card 4. Content for Card 4. Content for Card 4.Content for Card 4. Content for Card 4",
    },
    {
      title: "Card 5",
      subtitle: "Tech",
      content:
        "Content for Card 5. Content for Card 5. Content for Card 5. Content for Card 5.Content for Card 5. Content for Card 5",
    },
    {
      title: "Card 6",
      subtitle: "Tech",
      content:
        "Content for Card 6. Content for Card 6. Content for Card 6. Content for Card 6.Content for Card 6. Content for Card 6",
    },
    {
      title: "Card 7",
      subtitle: "Tech",
      content:
        "Content for Card 7. Content for Card 7. Content for Card 7. Content for Card 7.Content for Card 7. Content for Card 7",
    },
    {
      title: "Card 8",
      subtitle: "Tech",
      content:
        "Content for Card 8. Content for Card 8. Content for Card 8. Content for Card 8.Content for Card 8. Content for Card 8",
    },
    // Add more cards as needed
  ];

  return (
    <div>
      <Base>
        <Row className="d-flex flex-wrap">
          {cardsData.map((card, index) => (
            <Col xs="12" sm="6" md="4" key={index}>
              <Card outline key={index} className="m-2">
                <CardImg
                  alt="Card image cap"
                  src="https://c0.wallpaperflare.com/preview/728/375/731/aerial-analog-background-blog.jpg"
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle tag="h3">{card?.title}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {card?.subtitle}
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
