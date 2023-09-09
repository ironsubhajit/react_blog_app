import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, Link } from "react-router-dom";
import "./App.css";
import Base from "./components/Base";

function App() {
  return (
    <div className="App">
      <Base>
        This is home page
      </Base>
    </div>
  );
}

export default App;
