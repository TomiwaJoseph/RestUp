import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  authenticateUser,
  loginDemoUser,
  signInUser,
} from "../redux/actions/fetchers";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import authImg from "../statics/authImg.jpg";
import NoInternet from "../components/NoInternet";
import Preloader from "../components/Preloader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doneLoading, setDoneLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const storeContext = useSelector((state) => state.store);
  const { noInternet, fetchingData, isAuthenticated } = storeContext;

  const handleLoginForm = (e) => {
    e.preventDefault();
    signInUser([email, password]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const authenticateUrl =
      "https://rest.up.railway.app/api/auth/check-authentication";
    let previousUrl = state?.previousPath || "/user/dashboard";

    authenticateUser(authenticateUrl, (status) => {
      if (status.data.authenticated === false) {
        setDoneLoading(true);
      } else {
        navigate(previousUrl);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let previousUrl = state?.previousPath || "/user/dashboard";
    if (isAuthenticated) {
      navigate(previousUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {!doneLoading ? (
        <Preloader />
      ) : (
        <div className="login-container">
          <div className="login-background">
            <div className="img-container">
              <img
                src={authImg}
                className="img-fluid"
                alt="login-background-visual"
              />
            </div>
            <div className="login-block">
              <h2>LOGIN</h2>
              <form onSubmit={handleLoginForm}>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  name="email"
                  required
                  placeholder="Email"
                  type="email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  name="password"
                  required
                  placeholder="Password"
                  type="password"
                />
                <button type="submit">Login</button>
              </form>
              <button
                onClick={loginDemoUser}
                className="demo-btn"
                type="submit"
              >
                Demo User
              </button>
              <div className="sign-up-option">
                Don't have an account? {""}
                <NavLink to="/sign-up" className="sign-up">
                  sign-up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
