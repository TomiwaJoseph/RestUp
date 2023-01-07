import "./App.css";
import "./pages/page-styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import Restaurant from "./pages/Restaurant";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import SingleApartment from "./pages/SingleApartment";
import ReserveRoom from "./pages/ReserveRoom";
import ErrorPage from "./components/ErrorPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/Dashboard";
import { fetchUser } from "./redux/actions/auth";
import store from "./redux/store/store";
import { setLoginUser } from "./redux/actions/roomActions";
import { useEffect } from "react";

const App = () => {
  const getUserUrl = "http://localhost:8000/api/auth/user/";

  useEffect(() => {
    fetchUser(getUserUrl, (status) => {
      store.dispatch(setLoginUser(status));
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route
          path="/apartments/:apartmentSlug"
          element={<SingleApartment />}
        />
        <Route
          path="/reserve-room/:apartmentSlug/:roomSlug"
          element={<ReserveRoom />}
        />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<DashBoard />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
