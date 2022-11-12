import { NavLink } from "react-router-dom";
import featured1 from "../statics/room-1.jpg";
import "./roomcards.css";

const RoomCards = ({ data }) => {
  return (
    <>
      <div className="container room-card">
        <div className="row">
          {data.map((item) => (
            <div key={item} className="col-lg-4 mb-4">
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
                  <ul className="list">
                    <li>
                      <span>Max:</span> 6 Persons
                    </li>
                    <li>
                      <span>Bed:</span> 3
                    </li>
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <NavLink to={`/room-detail/${"single-economy"}`}>
                    <button className="btn">
                      Details <span className="fa fa-arrow-right"></span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomCards;
