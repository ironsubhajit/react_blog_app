import { useRouteError } from "react-router-dom";
import Base from "../components/Base";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Base>
        <div
          style={{ borderRadius: "0.75rem" }}
          className="not-found-page shadow"
        >
          <Container>
            <Row
              style={{ minHeight: "70vh" }}
              className="justify-content-center align-items-center"
            >
              <Col lg="6">
                <div className="text-center">
                  <h1 className="display-4">404 - Page Not Found</h1>
                  <p className="lead">
                    The page you are looking for does not exist.
                  </p>
                  <Link to="/" className="btn btn-dark">
                    Go to Home
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Base>
    </div>
  );
}
