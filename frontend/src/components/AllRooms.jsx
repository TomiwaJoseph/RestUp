import "./allrooms.css";
import { NavLink } from "react-router-dom";
import featured1 from "../statics/room-1.jpg";
import featured2 from "../statics/room-5.jpg";

const AllRooms = () => {
  return (
    <div className="container featured-rooms-container">
      <div className="row">
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-4">
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
          </div>
        </div>
        <div className="col-lg-3">
          <h1>Choking tins</h1>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
