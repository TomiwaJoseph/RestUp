import errorImg from "../statics/404.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    const getBody = document.body;
    getBody.classList.add("dark-nav");
    return () => {
      getBody.classList.remove("dark-nav");
    };
  }, []);

  return (
    <div className="error-div">
      <div className="error-image-wrapper">
        <img src={errorImg} alt="server-error" className="img-fluid" />
      </div>
      <h1>Unknown URL path</h1>
      <p>
        Don't mess with the url. It might take you to where you don't know 😅
      </p>
      <Link className="link-not-found" to="/apartments">
        Go Back To Apartments
      </Link>
    </div>
  );
};

export default ErrorPage;
