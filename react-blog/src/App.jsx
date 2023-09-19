import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Base from "./components/Base";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function App() {
  return (
    <div className="App">
      <Base>
        <div style={{ borderRadius: "0.75rem" }} className="home-page shadow">
          <Container>
            <Row
              style={{ minHeight: "70vh" }}
              className="justify-content-center align-items-center"
            >
              <Col lg="6">
                <div className="text-center">
                  <h1 className="display-4">Welcome to React Blog</h1>
                  <p className="lead">
                    Explore the latest articles, news, and more.
                  </p>
                  <Link to="/blog/list" className="btn btn-dark">
                    View blogs
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

export default App;
