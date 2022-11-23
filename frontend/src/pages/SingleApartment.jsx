import { NavLink, useParams } from "react-router-dom";
import roomImg3 from "../statics/room-4.jpg";
import roomImg1 from "../statics/room-1.jpg";
import roomImg2 from "../statics/room-2.jpg";
import roomImg4 from "../statics/room-3.jpg";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { ApartmentRooms } from "../data";

const SingleRoom = () => {
  const { apartmentSlug } = useParams();
  const roomsRef = useRef(null);
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, fetchingData } = storeContext;
  const roomImages = [roomImg1, roomImg2, roomImg4];
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
      <div className="apartment-header">
        <div className="img-container">
          <img src={roomImg3} className="img-fluid" alt="heroku-promises" />
        </div>
        <div className="nav-hero"></div>
        <div className="name-hero">
          <h1>Single Economy</h1>
          <hr className="accent" />
          {/* <NavLink to={`/reserve-room/${"single-economy"}`}> */}
          <button
            onClick={() =>
              roomsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn book-now"
          >
            Reserve Now
          </button>
          {/* </NavLink> */}
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
            Overthinking Department, {apartmentSlug} Apartments has
            accommodations with air conditioning and free WiFi. The units come
            with hardwood floors and feature a fully equipped kitchenette with a
            microwave, a flat-screen TV, and a private bathroom with shower and
            a hairdryer. A fridge is also offered, as well as an electric tea
            pot and a coffee machine. Popular points of interest near the
            apartment include StackOverflow Hall, GitHub Market Square and
            Google Hall Tower. The nearest airport is Fly Me There International
            Flights, 16.1 km from {apartmentSlug} Apartments, and the property
            offers a paid airport shuttle service.
          </p>
          <hr />
        </div>
        <button
          onClick={() =>
            roomsRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="btn reserve-btn"
        >
          Reserve Now!
        </button>
        <div ref={roomsRef} className="rooms-container text-center my-5">
          <h1>Rooms Container</h1>
          {ApartmentRooms.map((room) => (
            <div className="row apartment-room">
              <div className="col-8">five</div>
              <div className="col-4">four</div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
};

export default SingleRoom;
