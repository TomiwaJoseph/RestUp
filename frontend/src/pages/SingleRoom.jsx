import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Hero from "../components/Hero";
import "./singleroom.css";
import { roomDetails } from "../data";
import SingleRoomHeader from "../components/SingleRoomHeader";
import roomImg3 from "../statics/room-4.jpg";
import roomImg1 from "../statics/room-1.jpg";
import roomImg2 from "../statics/room-2.jpg";
import roomImg4 from "../statics/room-3.jpg";

const SingleRoom = () => {
  const { roomSlug } = useParams();
  const roomImages = [roomImg1, roomImg2, roomImg4];
  const info = {
    Price: 100,
    Size: 200,
    Capacity: 1,
    Pets: false,
    Breakfast: false,
  };
  let infoKeys = Object.keys(info);

  //   console.log(infoKeys);
  //   infoKeys.forEach((key, index) => {
  //     console.log(`${key}: ${info[key]}`);
  //   });

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
        <NavLink to="/">
          <button className="btn reserve-btn">Reserve / Book Now!</button>
        </NavLink>
      </div>
    </>
  );
};

export default SingleRoom;
