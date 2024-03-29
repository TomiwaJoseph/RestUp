import { useState } from "react";
import Preloader from "../components/Preloader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signUpUser } from "../redux/actions/fetchers";
import NoInternet from "../components/NoInternet";
import authImg from "../statics/authImg.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, noInternet, isAuthenticated } = storeContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const notify = (message, errorType) =>
    toast(message, {
      position: "top-center",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      notify("Both passwords don't match", "error");
    } else {
      signUpUser([firstName, lastName, email, password]);
    }
  };

  if (isAuthenticated) {
    return navigate("/");
  }

  if (fetchingData) {
    return <Preloader />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      <div className="signup-container">
        <div className="signup-background">
          <div className="img-container">
            <img
              src={authImg}
              className="img-fluid"
              alt="signup-background-visual"
            />
          </div>
          <div className="signup-block">
            <h2>SIGN UP</h2>
            <form onSubmit={handleSignUpSubmit}>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                className="form-control"
                name="firstName"
                required
                placeholder="First Name"
                type="text"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                className="form-control"
                name="lastName"
                required
                placeholder="Last Name"
                type="text"
              />
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
              <input
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="form-control"
                name="repeatPassword"
                required
                placeholder="Repeat Password"
                type="password"
              />
              <button type="submit">Sign Up</button>
            </form>
            <div className="sign-in-option">
              Already have an account? {""}
              <NavLink to="/login" className="sign-up">
                sign in
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
