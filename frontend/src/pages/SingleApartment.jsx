import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import NoInternet from "../components/NoInternet";
import Preloader from "../components/Preloader";
import ErrorPage from "../components/ErrorPage";
import { fetchSingleApartment } from "../redux/actions/fetchers";
import {
  removeSelectedApartment,
  setBadRequest,
} from "../redux/actions/roomActions";

const SingleApartment = () => {
  const { apartmentSlug } = useParams();
  const dispatch = useDispatch();
  const roomsRef = useRef(null);
  const storeContext = useSelector((state) => state.store);
  const {
    backendUrl,
    fetchingData,
    badRequest,
    noInternet,
    singleApartmentData,
  } = storeContext;
  const { all_apartment_images, room_details, apartment_name } =
    singleApartmentData;

  const roomIcons = {
    "Air conditioning": "fa-snowflake",
    "Flat-screen TV": "fa-tv",
    Soundproof: "fa-volume-mute",
    "Free WiFi": "fa-wifi",
  };
  const cancellationInfo = [
    "Non-refundable",
    `Free cancellation until 11:59 PM on ${new Date().toLocaleString(
      "default",
      { month: "long" }
    )} ${new Date().getDate()}, ${new Date().getFullYear()}`,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSingleApartment(apartmentSlug);
    return () => {
      dispatch(removeSelectedApartment());
      dispatch(setBadRequest(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apartmentSlug]);

  useEffect(() => {
    const getBody = document.body;
    if (noInternet || badRequest) {
      getBody.classList.add("dark-nav");
    } else {
      getBody.classList.remove("dark-nav");
    }
    return () => {
      getBody.classList.remove("dark-nav");
    };
  }, [noInternet, badRequest]);

  if (fetchingData) {
    return <Preloader />;
  }

  if (badRequest) {
    return <ErrorPage />;
  }

  if (noInternet) {
    return <NoInternet />;
  }

  return (
    <>
      {Object.keys(singleApartmentData).length === 0 ? (
        <Preloader />
      ) : (
        <>
          <div className="apartment-header">
            <div className="img-container">
              <img
                src={`${backendUrl}${all_apartment_images[0]}`}
                className="img-fluid"
                alt="apartment-header-visual"
              />
            </div>
            <div className="nav-hero"></div>
            <div className="name-hero">
              <h1>{apartment_name}</h1>
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
              {all_apartment_images.slice(1).map((photo, index) => (
                <div key={index} className="img-wrapper">
                  <img
                    src={`${backendUrl}${photo}`}
                    alt="room-visual"
                    className="room-img"
                  />
                </div>
              ))}
            </div>
            <div className="room-description">
              <h4>Details</h4>
              <p>
                Located a 5-minute walk from St. Bug's Gate in Oversight /
                Overthinking Department, {apartmentSlug} Apartments has
                accommodations with air conditioning and free WiFi. The units
                come with hardwood floors and feature a fully equipped
                kitchenette with a microwave, a flat-screen TV, and a private
                bathroom with shower and a hairdryer. A fridge is also offered,
                as well as an electric tea pot and a coffee machine. Popular
                points of interest near the apartment include StackOverflow
                Hall, GitHub Market Square and Google Hall Tower. The nearest
                airport is Fly Me There International Flights, 16.1 km from{" "}
                {apartmentSlug} Apartments, and the property offers a paid
                airport shuttle service.
              </p>
              <hr />
            </div>
            <div ref={roomsRef} style={{ height: "10vh" }}></div>
            <div className="rooms-container text-center my-5">
              {room_details.map((room) => (
                <div key={room.id} className="row apartment-room mx-auto">
                  <div className="col-md-8 single-room">
                    <h3>{room.name}</h3>
                    <div className="bedtype-capacity">
                      <p>{room.bed_type}</p>
                      <span>
                        Max people: <b>{room.max_people}</b>
                      </span>
                    </div>
                    <div className="room-info">
                      <small>
                        <span className="fa fa-ruler-combined"></span>
                        {room.size} m<sup>2</sup>
                      </small>
                      {room.room_info.map((info) => (
                        <small key={info}>
                          <span className={`fa ${roomIcons[info]}`}></span>{" "}
                          {info}
                        </small>
                      ))}
                    </div>
                    <hr />
                    <div className="room-extras">
                      {room.room_extras.map((extra) => (
                        <small key={extra}>
                          <span>✔</span> {extra}
                        </small>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-4 apartment-cta my-auto">
                    <p>${room.price} / night</p>
                    <p
                      className={
                        room.refundable * 1 ? "refundable" : "not-refundable"
                      }
                    >
                      {cancellationInfo[room.refundable * 1]}
                    </p>
                    <NavLink to={`/reserve-room/${apartmentSlug}/${room.slug}`}>
                      <button className="btn reserve-now-btn">Reserve</button>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        </>
      )}
    </>
  );
};

export default SingleApartment;
