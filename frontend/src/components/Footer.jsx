import "./footer.css";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <h2>
          Rest <em>up</em>
        </h2>
        <div className="footer__cta">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/apartments">Apartments</NavLink>
          <NavLink to="/restaurant">Restaurant</NavLink>
          <Link style={{ pointerEvents: "none" }} to="/">
            How It Works?
          </Link>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact-us">Contact Us</NavLink>
        </div>
        <div className="footer__social-media">
          <i className="fab fa-github"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-facebook"></i>
          <i className="fab fa-pinterest"></i>
        </div>
      </div>
      <hr className="last_hr" />
      <div className="copyright">
        <p>Copyright &copy;2022 TomiwaJoseph &hearts;</p>
      </div>
    </footer>
  );
};

export default Footer;
