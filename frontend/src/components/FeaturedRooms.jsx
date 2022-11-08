import "./featuredrooms.css";
import featured1 from "../statics/room-1.jpg";
import featured2 from "../statics/room-5.jpg";
import featured3 from "../statics/room-3.jpg";
import { NavLink } from "react-router-dom";

const FeaturedRooms = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mb-5 pb-3">
          <div className="heading-section featured-rooms">
            <h2 className="mb-4">Featured Rooms</h2>
          </div>
        </div>
      </div>
      <div className="container featured-rooms-container">
        <div className="row">
          <div className="ml-auto col-lg-4">
            <div className="card">
              <img
                src={featured1}
                alt="featured-room-1"
                className="img-fluid"
              />
              <div className="card-body text-center">
                <h4 className="card-title">Deluxe Room</h4>
                <p className="card-text">$120</p>
                <span>per night</span>
              </div>
              <div className="card-footer text-center">
                <NavLink to={"/rooms"}>
                  <button className="btn">
                    Details <span className="fa fa-arrow-right"></span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <img
                src={featured2}
                alt="featured-room-2"
                className="img-fluid"
              />
              <div className="card-body">
                <h4 className="card-title">Exquisite Room</h4>
                <p className="card-text">$350</p>
                <span>per night</span>
              </div>
              <div className="card-footer text-center">
                <NavLink to={"/rooms"}>
                  <button className="btn">
                    Details <span className="fa fa-arrow-right"></span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="mr-auto col-lg-4">
            <div className="card">
              <img
                src={featured3}
                alt="featured-room-3"
                className="img-fluid"
              />
              <div className="card-body">
                <h4 className="card-title">Tranqil Room</h4>
                <p className="card-text">$520</p>
                <span>per night</span>
              </div>
              <div className="card-footer text-center">
                <NavLink to={"/rooms"}>
                  <button className="btn">
                    Details <span className="fa fa-arrow-right"></span>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedRooms;
