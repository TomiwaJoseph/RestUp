import "./landingpagecarousel.css";
import img1 from "../statics/pexels-donald-tong-189296.jpg";
import img2 from "../statics/pexels-pixabay-261101.jpg";
import img3 from "../statics/pexels-jhency-xang-3789045.jpg";
import { NavLink } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const LandingCarousel = () => {
  return (
    <>
      <Fade arrows={false} duration={6000} pauseOnHover={false}>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img1} alt="landing-page-visual-1" />
          </div>
          <div className="carousel__captions">
            <p>"If you get tired, learn to rest, not to quit."</p>
            <NavLink to="/apartments" className="btn">
              View Apartments
            </NavLink>
          </div>
        </div>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img2} alt="landing-page-visual-2" />
          </div>
          <div className="carousel__captions">
            <p className="animate__animated animate__slideInUp">
              "Rest is the sweet sauce of labor."
            </p>
            <NavLink
              to="/apartments"
              className="btn animate__animated animate__flipInY"
            >
              View our Apartments
            </NavLink>
          </div>
        </div>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img3} alt="landing-page-visual-3" />
          </div>
          <div className="carousel__captions">
            <p>"Wisdom is knowing when to have rest."</p>
            <NavLink to="/apartments" className="btn">
              View Apartments
            </NavLink>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default LandingCarousel;
