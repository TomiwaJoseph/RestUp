import { NavLink, useParams } from "react-router-dom";
// import "./page-styles.css";
import roomImg3 from "../statics/room-4.jpg";
import roomImg1 from "../statics/room-1.jpg";
import roomImg2 from "../statics/room-2.jpg";
import roomImg4 from "../statics/room-3.jpg";
// import RoomCards from "../components/RoomCards";
import HeaderSection from "../components/HeaderSection";
import { useSelector } from "react-redux";
import featured1 from "../statics/room-1.jpg";

const SingleRoom = () => {
  const { roomSlug } = useParams();
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, fetchingData, relatedRoomsData } = storeContext;
  const roomImages = [roomImg1, roomImg2, roomImg4];
  const info = {
    Price: 100,
    Size: 200,
    Capacity: 1,
    Pets: false,
    Breakfast: false,
  };
  let infoKeys = Object.keys(info);
  const roomExtras = [
    "Plush pillows and breathable bed linens",
    "Soft, oversized bath towels",
    "Full-sized, pH-balanced toiletries",
    "Complimentary refreshments",
    "Adequate safety/security",
    "Internet",
    "Comfortable beds",
  ];

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  return (
    <>
      <div className="room__header">
        <div className="img-container">
          <img src={roomImg3} className="img-fluid" alt="heroku-promises" />
        </div>
        <div className="nav-hero"></div>
        <div className="name__hero">
          <h1>Single Economy</h1>
          <hr className="accent" />
          <NavLink to={`/reserve-room/${"single-economy"}`}>
            <button className="btn book-now">Book Now</button>
          </NavLink>
        </div>
      </div>
      <div className="container">
        <div className="room-images">
          {roomImages.map((photo, index) => (
            <div key={index} className="img-wrapper">
              <img src={photo} alt="room-visual" className="room-img" />
            </div>
          ))}
        </div>
        <div className="room-description">
          <h4>Details</h4>
          <p>
            Located a 5-minute walk from St. Bug's Gate in Oversight /
            Overthinking Department, Single Economy Apartments has
            accommodations with air conditioning and free WiFi. The units come
            with hardwood floors and feature a fully equipped kitchenette with a
            microwave, a flat-screen TV, and a private bathroom with shower and
            a hairdryer. A fridge is also offered, as well as an electric tea
            pot and a coffee machine. Popular points of interest near the
            apartment include StackOverflow Hall, GitHub Market Square and
            Google Hall Tower. The nearest airport is Fly Me There International
            Flights, 16.1 km from Single Economy Apartments, and the property
            offers a paid airport shuttle service.
          </p>
        </div>
        <div className="room-info">
          <h4>Info</h4>
          <ul className="info-wrapper">
            {infoKeys.map((key, index) => (
              <li key={index}>
                <span>{`${key}:`} </span>
                {`${info[key]}`}
              </li>
            ))}
          </ul>
        </div>
        <div className="room-extras">
          <h4>Extras</h4>
          <ul className="extras-wrapper">
            {roomExtras.map((extra, index) => (
              <li key={index}>- {extra}</li>
            ))}
          </ul>
        </div>
        <NavLink to={`/reserve-room/${"single-economy"}`}>
          <button className="btn reserve-btn">Reserve / Book Now!</button>
        </NavLink>
        <HeaderSection title={"Related Rooms"} />
        {/* <div className="row">
          <RoomCards data={[..."abc"]} />
        </div> */}
        {/* <div className="container"> */}
        <div className="row room-card">
          {relatedRoomsData.map((room) => (
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
                  <NavLink to={`/rooms/room-detail/${"single-economy"}`}>
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
        {/* </div> */}
      </div>
    </>
  );
};

export default SingleRoom;
