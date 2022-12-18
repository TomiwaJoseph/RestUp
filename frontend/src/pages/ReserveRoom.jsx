import { NavLink, useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import roomImg2 from "../statics/room-2.jpg";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
import { useState, useEffect, useRef } from "react";
import { fetchSingleRoomDetails } from "../redux/actions/fetchers";
import { removeSingleRoomDetails } from "../redux/actions/roomActions";
import { useDispatch, useSelector } from "react-redux";
import NoInternet from "../components/NoInternet";
import Preloader from "../components/Preloader";
import ErrorPage from "../components/ErrorPage";
import { toast } from "react-toastify";

const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

const ReserveRoom = () => {
  const { roomSlug, apartmentSlug } = useParams();
  const dispatch = useDispatch();
  const storeContext = useSelector((state) => state.store);
  const { fetchingData, badRequest, noInternet, singleRoomDetails } =
    storeContext;
  const { room_price, room_refundable } = singleRoomDetails;
  // Date formatter
  let getTodayDate = new Date().toString();
  let splittedDate = getTodayDate.split(" ");
  let startDate = `${splittedDate[0]}, ${splittedDate[1]} ${splittedDate[2]}, ${splittedDate[3]}`;
  const detailsFormRef = useRef();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(true);
  const [activeCrumb, setActiveCrumb] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [duration, setDuration] = useState(0);
  const [durationPrice, setDurationPrice] = useState("");
  const [checkInDate, setCheckInDate] = useState(startDate);
  const [checkOutDate, setCheckOutDate] = useState(startDate);

  const notify = (message, errorType) =>
    toast(message, {
      position: "top-center",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  console.log(PUBLISHABLE_KEY);
  console.log(stripePromise);

  // const handleCTA = (destination) => {
  //   document.body.style.overflow = "auto";
  //   if (destination === "rooms") {
  //     return navigate("/" + destination);
  //   }
  //   return navigate("/");
  // };

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  // const successMessage = () => {
  //   return (
  //     <div className="success-msg">
  //       <svg
  //         width="1em"
  //         height="1em"
  //         viewBox="0 0 16 16"
  //         className="bi bi-check2"
  //         fill="currentColor"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           fillRule="evenodd"
  //           d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
  //         />
  //       </svg>
  //       <div className="title">Payment Successful!</div>
  //       <p>Enjoy your stay with us.</p>
  //       <div className="call-to-action">
  //         <button onClick={() => handleCTA("home")} className="btn">
  //           Home
  //         </button>
  //         <button onClick={() => handleCTA("rooms")} className="btn">
  //           Rooms
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // useEffect(() => {
  //   if (paymentCompleted) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [paymentCompleted]);

  const handleDurationStay = () => {
    if (duration < 1 || duration === "" || duration === "e") {
      notify("Please select duration of stay.", "info");
    } else {
      setActiveCrumb(1);
    }
  };
  const handleInputChange = (event) => {
    let duration_value = event.target.value;
    duration_value !== "" ? setDuration(duration_value) : setDuration(0);
    duration_value !== ""
      ? setDurationPrice(duration_value * room_price)
      : setDurationPrice("");
    let addedDate = new Date(Date.now() + duration_value * 86400000).toString();
    let splittedDate = addedDate.split(" ");
    let newEndDate = `${splittedDate[0]}, ${splittedDate[1]} ${splittedDate[2]}, ${splittedDate[3]}`;
    duration_value !== ""
      ? setCheckOutDate(newEndDate)
      : setCheckOutDate(startDate);
  };
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // let firstName = data.get("first-name");
    // let lastName = data.get("last-name");
    // let email = data.get("email");
    // let phoneNumber = data.get("phone");
    setUserFirstName(data.get("first-name"));
    setUserLastName(data.get("last-name"));
    setUserEmail(data.get("email"));
    setUserPhoneNumber(data.get("phone"));
    setActiveCrumb(2);
  };

  useEffect(() => {
    fetchSingleRoomDetails([apartmentSlug, roomSlug]);
    return () => {
      dispatch(removeSingleRoomDetails());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="apartment-header">
        <div className="img-container">
          <img src={roomImg2} className="img-fluid" alt="heroku-promises" />
        </div>
        <div className="nav-hero"></div>
        <div className="name-hero">
          <h1>{roomSlug}</h1>
          <hr className="accent" />
        </div>
      </div>
      <div className="container">
        <div className={openModal ? "contactModal" : "contactModal hidden"}>
          <div className="modalContainer">
            <div className="modalBody">
              <i id="modalIcon" className="fa"></i>
              <h2 id="modalHTwo">Status</h2>
              <p id="modalP">Message</p>
              <button
                type="button"
                onClick={() => setOpenModal((prev) => !prev)}
                className="btn"
              >
                close
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 mx-auto mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => setActiveCrumb(0)}
                className={activeCrumb === 0 ? "btn crumb active" : "btn crumb"}
              >
                Stay Duration
              </button>
              <div className="crumb-demarcate"></div>
              <button
                onClick={() => setActiveCrumb(1)}
                className={activeCrumb === 1 ? "btn crumb active" : "btn crumb"}
              >
                Your Details
              </button>
              <div className="crumb-demarcate"></div>
              <button
                onClick={() => setActiveCrumb(2)}
                className={activeCrumb === 2 ? "btn crumb active" : "btn crumb"}
              >
                Final Step
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {activeCrumb === 0 && (
            <div className="mx-auto col-md-5 my-3 reserve-box">
              <input
                className="form-control"
                placeholder="Enter number of nights"
                onChange={handleInputChange}
                type="number"
                min={1}
              />
              <hr />
              <div className="date-div">
                <div className="check-in">
                  <p className="check-in-text">Check-in</p>
                  <div className="check-in-details">
                    <p>{checkInDate}</p>
                    <p>2:00 PM - 12:00 AM</p>
                  </div>
                </div>
                <div className="check-out">
                  <p className="check-out-text">Check-out</p>
                  <div className="check-out-details">
                    <p>{checkOutDate}</p>
                    <p>Until 12:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="stay-div">
                <p>Total length of stay:</p>
                <p>{`${duration} ${duration > 1 ? "nights" : "night"}`}</p>
              </div>
              <hr />
              <div className="price-div">
                <p>Price</p>
                <p>USD {durationPrice}</p>
              </div>
              <hr className="mt-1" />
              <button
                onClick={() => handleDurationStay()}
                className="btn w-100 selection-confirm"
              >
                Continue
              </button>
            </div>
          )}
          {activeCrumb === 1 && (
            <div className="mx-auto col-md-5 my-3 details-box">
              <p className="details-text">Enter your details</p>
              <hr />
              <form ref={detailsFormRef} onSubmit={handleDetailsSubmit}>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="first-name"
                      required
                      className="form-control"
                      // placeholder="First Name"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="last-name"
                      required
                      className="form-control"
                      // placeholder="Last Name"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="form-control"
                      // placeholder="Email"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      required
                      className="form-control"
                      // placeholder="Phone"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn w-100 mt-2 details-confirm"
                >
                  Next
                </button>
              </form>
            </div>
          )}
          {activeCrumb === 2 && (
            <div className="mx-auto col-md-5 my-3 checkout-box">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={durationPrice}
                  setPaymentCompleted={setPaymentCompleted}
                />
              </Elements>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReserveRoom;
