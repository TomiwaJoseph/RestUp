import "./landingpagecarousel.css";
import img1 from "../statics/pexels-rene-asmussen-635126.jpg";
import img2 from "../statics/pexels-pixabay-261101.jpg";
import img3 from "../statics/pexels-donald-tong-189296.jpg";
import { NavLink } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const LandingCarousel = () => {
  return (
    <>
      <Fade arrows={false} duration={25000} pauseOnHover={false}>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img1} alt="" />
          </div>
          <div className="carousel__captions">
            <h5 className="animate__animated animate__bounceInDown">
              Best Offer
            </h5>
            <h1 className="animate__animated animate__slideInUp">Top Rated</h1>
            <NavLink
              to="/shop"
              state={{
                categoryTitle: "Top Rated",
                categorySlug: "top-rated",
              }}
              className="btn animate__animated animate__flipInY"
            >
              View Category
            </NavLink>
          </div>
        </div>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img2} alt="" />
          </div>
          <div className="carousel__captions">
            <h5>Flash Deals</h5>
            <h1>New Dresses</h1>
            <NavLink
              to="/shop"
              state={{
                categoryTitle: "New Dresses",
                categorySlug: "new-dresses",
              }}
              className="btn"
            >
              View Category
            </NavLink>
          </div>
        </div>
        <div className="each-fade-effect">
          <div className="image__container">
            <img src={img3} alt="" />
          </div>
          <div className="carousel__captions">
            <h5>New Arrivals</h5>
            <h1>Mini Dresses</h1>
            <NavLink
              to="/shop"
              state={{
                categoryTitle: "Mini Dresses",
                categorySlug: "mini-dresses",
              }}
              className="btn"
            >
              View Category
            </NavLink>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default LandingCarousel;
