import "./testimonials.css";
import { Fade } from "react-slideshow-image";
import { testimonials } from "../data";
import "react-slideshow-image/dist/styles.css";

const Testimonials = () => {
  return (
    <div className="container testimonial-container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-title text-center">
            <h2>Happy Customers Say...</h2>
          </div>
          <div className="mx-auto col-md-7">
            <Fade
              arrows={false}
              indicators={true}
              autoplay={true}
              pauseOnHover={false}
            >
              {testimonials.map((testimony) => (
                <div key={testimony.id} className="each-fade-effect">
                  <div className="testimonial-image-container">
                    <img src={testimony.image} alt={testimony.name} />
                  </div>
                  <p>{testimony.review}</p>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
