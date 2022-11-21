import { NavLink } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import featured1 from "../statics/room-1.jpg";

const FeaturedRooms = ({ data }) => {
  return (
    <>
      <HeaderSection title={"Featured Apartments"} />
      <div className="container">
        <div className="row room-card">
          {data.map((room) => (
            <div key={room} className="col-lg-4 mb-4">
              <div className="card">
                <img
                  src={featured1}
                  alt="featured-room-1"
                  className="img-fluid"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">Deluxe Room</h5>
                  <p className="card-text">$120</p>
                  <span>/ night</span>
                </div>
                <div className="card-footer text-center">
                  <NavLink to={`/apartments/room-detail/${"single-economy"}`}>
                    <button className="btn">
                      Details <span className="fa fa-arrow-right"></span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
};

export default FeaturedRooms;
