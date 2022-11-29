import { NavLink, useParams } from "react-router-dom";
import roomImg3 from "../statics/room-4.jpg";
import roomImg1 from "../statics/room-1.jpg";
import roomImg2 from "../statics/room-2.jpg";
import roomImg4 from "../statics/room-3.jpg";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { ApartmentRooms } from "../data";
import { format } from "date-fns";

const SingleApartment = () => {
  const { apartmentSlug } = useParams();
  const roomsRef = useRef(null);
  const storeContext = useSelector((state) => state.store);
  const { backendUrl, fetchingData } = storeContext;
  const roomImages = [roomImg1, roomImg2, roomImg4];
  // const roomExtras = [
  //   "Plush pillows and breathable bed linens",
  //   "Soft, oversized bath towels",
  //   "Full-sized, pH-balanced toiletries",
  //   "Complimentary refreshments",
  //   "Adequate safety/security",
  //   "Internet",
  //   "Comfortable beds",
  // ];
  const roomIcons = {
    "Air conditioning": "fa-snowflake",
    "Flat-screen TV": "fa-tv",
    Soundproof: "fa-volume-mute",
    "Free WiFi": "fa-wifi",
  };
  const cancellationInfo = [
    `Free cancellation until 11:59 PM on ${new Date().toLocaleString(
      "default",
      { month: "long" }
    )} ${new Date().getDate()}, ${new Date().getFullYear()}`,
    "Non-refundable",
  ];
  // console.log(new Date());
  // console.log(new Date().toLocaleString("default", { month: "long" }));
  // console.log(`${format(new Date(), "dd/mm/yyy")}`);

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
          <button
            onClick={() =>
              roomsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn book-now"
          >
            Reserve Now
          </button>
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
        <div ref={roomsRef} style={{ height: "10vh" }}></div>
        <div className="rooms-container text-center my-5">
          {ApartmentRooms.map((room) => (
            <div key={room.slug} className="row apartment-room mx-auto">
              <div className="col-md-8 single-room">
                <h3>{room.name}</h3>
                <p>{room.bedType}</p>
                <div className="room-info">
                  <small>
                    <span className="fa fa-ruler-combined"></span>{" "}
                    {room.roomInfo[0]}
                    <sup>2</sup>
                  </small>
                  {room.roomInfo.slice(1).map((info) => (
                    <small key={info}>
                      <span className={`fa ${roomIcons[info]}`}></span> {info}
                    </small>
                  ))}
                </div>
                <hr />
                <div className="room-extras">
                  {room.roomExtras.map((extra) => (
                    <small key={extra}>
                      <span>✔</span> {extra}
                    </small>
                  ))}
                </div>
              </div>
              <div className="col-md-4 apartment-cta my-auto">
                <p className="duration">3 nights</p>
                <p>Price ${room.price}</p>
                <p
                  className={
                    !room.refundable * 1 ? "refundable" : "not-refundable"
                  }
                >
                  {cancellationInfo[room.refundable * 1]}
                </p>
                <NavLink to={`/reserve-room/${room.slug}`}>
                  <button className="btn reserve-now-btn">Reserve</button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
};

export default SingleApartment;
