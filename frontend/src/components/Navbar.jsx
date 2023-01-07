import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
    if (!click) {
      document.body.style["overflow"] = "hidden";
    } else {
      document.body.style["overflow"] = "auto";
    }
  };
  const closeMobileMenu = () => {
    setClick(false);
    document.body.style["overflow"] = "auto";
  };
  const storeContext = useSelector((state) => state.store);
  const { isAuthenticated } = storeContext;

  useEffect(() => {
    const onScroll = () => {
      let scroll = window.pageYOffset;
      let navbar = document.getElementsByClassName("the_navbar")[0];

      if (scroll > 450) {
        if (!navbar.classList.contains("fix__navbar")) {
          navbar.classList.add("fix__navbar");
        }
      } else {
        navbar.classList.remove("fix__navbar");
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav className="the_navbar">
        <NavLink onClick={closeMobileMenu} className="logo" to="/">
          <h2>
            Rest <em>Up</em>
          </h2>
        </NavLink>
        <NavLink to="/search-dress">
          <i
            onClick={closeMobileMenu}
            className="fa fa-search search__mobile-icon"
          ></i>
        </NavLink>
        <i
          onClick={handleClick}
          className={click ? "fa fa-times" : "fa fa-align-right"}
        ></i>
        <div className={click ? "navMenu active" : "navMenu"}>
          <NavLink
            onClick={closeMobileMenu}
            id="home"
            className="navLink"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={closeMobileMenu}
            className="navLink"
            to="/apartments"
          >
            Apartments
          </NavLink>
          <NavLink
            onClick={closeMobileMenu}
            className="navLink"
            to="/restaurant"
          >
            Restaurant
          </NavLink>
          <NavLink
            onClick={closeMobileMenu}
            className="navLink"
            to="/contact-us"
          >
            Contact
          </NavLink>
          {/* {isAuthenticated ? (
            <NavLink
              onClick={closeMobileMenu}
              className="navLink"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              onClick={closeMobileMenu}
              id="login"
              className="navLink"
              to="/login"
            >
              Login
            </NavLink>
          )} */}
          <div className="mobileLink">
            {click ? (
              <>
                <a
                  onClick={closeMobileMenu}
                  className="nav-brands-mobile"
                  rel="noreferrer"
                  target="_blank"
                  href="https://github.com/TomiwaJoseph"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  onClick={closeMobileMenu}
                  className="nav-brands-mobile"
                  target="_blank"
                  href="/"
                  style={{ pointerEvents: "none" }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  onClick={closeMobileMenu}
                  className="nav-brands-mobile"
                  target="_blank"
                  href="/"
                  style={{ pointerEvents: "none" }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </>
            ) : null}
          </div>
        </div>
        <div className="navBrands">
          {isAuthenticated ? (
            <NavLink
              onClick={closeMobileMenu}
              className="navLink"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              onClick={closeMobileMenu}
              id="login"
              className="navLink"
              to="/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
