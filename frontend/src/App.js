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
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route
          path="/apartments/apartment-detail/:apartmentSlug"
          element={<SingleApartment />}
        />
        <Route path="/reserve-room/:roomSlug" element={<ReserveRoom />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/search-apartments" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
