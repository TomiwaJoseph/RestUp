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
      let navbar = document.getElementsByClassName("the-navbar")[0];

      if (scroll > 450) {
        if (!navbar.classList.contains("fix-navbar")) {
          navbar.classList.add("fix-navbar");
        }
      } else {
        navbar.classList.remove("fix-navbar");
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <nav className={click ? "nav-clicked the-navbar" : "the-navbar"}>
        <div className="nav-left">
          <NavLink onClick={closeMobileMenu} to="/">
            <h2>
              Rest <em>Up</em>
            </h2>
          </NavLink>
        </div>
        <div className="mobile-icons">
          <NavLink to="/apartments">
            <i onClick={closeMobileMenu} className="fa fa-home"></i>
          </NavLink>
          <i
            onClick={handleClick}
            className={click ? "fa fa-times" : "fa fa-align-right"}
          ></i>
        </div>
        <div className={click ? "nav-menu active" : "nav-menu"}>
          <div className="desktop-links">
            <NavLink
              onClick={closeMobileMenu}
              id="home"
              className="nav-link"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={closeMobileMenu}
              className="nav-link"
              to="/apartments"
            >
              Apartments
            </NavLink>
            <NavLink
              onClick={closeMobileMenu}
              className="nav-link"
              to="/restaurant"
            >
              Restaurant
            </NavLink>
            <NavLink
              onClick={closeMobileMenu}
              className="nav-link"
              to="/contact-us"
            >
              Contact
            </NavLink>
            {click && (
              <>
                {isAuthenticated ? (
                  <NavLink
                    onClick={closeMobileMenu}
                    className="nav-link"
                    to="/user/dashboard"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <NavLink
                    onClick={closeMobileMenu}
                    id="login"
                    className="nav-link"
                    to="/login"
                  >
                    Login
                  </NavLink>
                )}
              </>
            )}
          </div>
          <div className="mobile-links">
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
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/tomiwa-joseph-a2b024203/"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
                <a
                  onClick={closeMobileMenu}
                  className="nav-brands-mobile"
                  rel="noreferrer"
                  target="_blank"
                  href="https://twitter.com/tomiwajoseph10"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </>
            ) : null}
          </div>
        </div>
        <div className="nav-right">
          {isAuthenticated ? (
            <NavLink
              onClick={closeMobileMenu}
              className="nav-link"
              to="/user/dashboard"
            >
              Dashboard
            </NavLink>
          ) : (
            <NavLink
              onClick={closeMobileMenu}
              id="login"
              className="nav-link"
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
