import { NavLink } from "react-router-dom";
import HeaderSection from "./HeaderSection";
import featured1 from "../statics/room-2.jpg";

const FeaturedRooms = ({ data, backendUrl }) => {
  return (
    <>
      <HeaderSection title={"Featured Apartments"} />
      <div className="container">
        <div className="row room-card">
          {data.map((apartment) => (
            <div key={apartment.id} className="col-lg-4 mb-4">
              <div className="card">
                <img
                  src={`${backendUrl}${apartment.main_image}`}
                  alt={apartment.slug}
                  className="img-fluid"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{apartment.name}</h5>
                </div>
                <div className="card-footer text-center">
                  <NavLink
                    to={`/apartments/apartment-detail/${apartment.slug}`}
                  >
                    <button className="btn">
                      View Details <span className="fa fa-arrow-right"></span>
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
