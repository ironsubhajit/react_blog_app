import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import "./App.css";
import Base from "./components/Base";

function App() {
  return (
    <div className="App">
      <Base>
        <Link to={`about`}>About page</Link>
        <br />
        <Link to={`blogs`}>Blog list page</Link>
        <br />
        <Link to={`add-blog`}>Blog create page</Link>
        <br />
        <Link to={`edit-blog`}>Blog update page</Link>
      </Base>
    </div>
  );
}

export default App;
