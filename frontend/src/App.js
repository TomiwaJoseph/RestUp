import "./App.css";
import "./pages/page-styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Restaurant from "./pages/Restaurant";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import SingleRoom from "./pages/SingleRoom";
import ReserveRoom from "./pages/ReserveRoom";
import Search from "./pages/Search";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/room-detail/:roomSlug" element={<SingleRoom />} />
        <Route path="/reserve-room/:roomSlug" element={<ReserveRoom />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/search-room" element={<Search />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
