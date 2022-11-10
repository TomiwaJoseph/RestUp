import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import SingleRoom from "./pages/SingleRoom";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/room-detail/:roomSlug" element={<SingleRoom />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
