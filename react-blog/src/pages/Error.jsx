import { useRouteError } from "react-router-dom";
import SiteNavbar from "../components/SiteNavbar";
import Base from "../components/Base";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <Base>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Base>
    </div>
  );
}
