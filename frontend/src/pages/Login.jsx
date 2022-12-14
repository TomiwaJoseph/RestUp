import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loginDemoUser } from "../redux/actions/fetchers";
import { NavLink } from "react-router-dom";
import authImg from "../statics/authImg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const storeContext = useSelector((state) => state.store);
  const { noInternet, fetchingData, isAuthenticated } = storeContext;

  const handleLoginForm = (e) => {
    e.preventDefault();
    console.log("form submitted...");
    console.log("email is ", email);
    console.log("password is ", password);
  };

  useEffect(() => {
    const getBody = document.body;
    getBody.classList.add("dark-nav");
    return () => {
      getBody.classList.remove("dark-nav");
    };
  }, []);

  return (
    <>
      <div className="login-container">
        <img src={authImg} alt="" className="img-fluid auth-img" />
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
          <button onClick={loginDemoUser} className="demo-btn" type="submit">
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
    </>
  );
};

export default Login;
