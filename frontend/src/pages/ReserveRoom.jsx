import { NavLink, useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import roomImg2 from "../statics/room-2.jpg";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
import { useState, useEffect, useRef } from "react";

const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

const ReserveRoom = () => {
  const { roomSlug } = useParams();
  const detailsFormRef = useRef();
  const navigate = useNavigate();
  const [paymentCompleted, setPaymentCompleted] = useState(true);
  const [activeCrumb, setActiveCrumb] = useState(0);
  const [openModal, setOpenModal] = useState(false);
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
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   if (paymentCompleted) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [paymentCompleted]);

  // console.log(PUBLISHABLE_KEY);
  // console.log(stripePromise);
  // console.log(activeCrumb);
  // console.log(activeCrumb === 0);
  // console.log(" ");
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log("details submitted...");
    const data = new FormData(e.target);
    // let name = data.get("name");
    // let email = data.get("email");
    // let message = data.get("message");
    setActiveCrumb(2);
  };

  return (
    <>
      <div className="apartment-header">
        <div className="img-container">
          <img src={roomImg2} className="img-fluid" alt="heroku-promises" />
        </div>
        <div className="nav-hero"></div>
        <div className="name-hero">
          <h1>Single Economy</h1>
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
                Your selection
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
              <p className="booking-text">Your booking details</p>
              <hr />
              <div className="date-div">
                <div className="check-in">
                  <p className="check-in-text">Check-in</p>
                  <div className="check-in-details">
                    <p>Wed, Nov 23, 2022</p>
                    <p>2:00 PM - 12:00 AM</p>
                  </div>
                </div>
                <div className="check-out">
                  <p className="check-out-text">Check-out</p>
                  <div className="check-out-details">
                    <p>Wed, Nov 27, 2022</p>
                    <p>Until 12:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="stay-div">
                <p>Total length of stay:</p>
                <p>3 nights</p>
              </div>
              <hr />
              <div className="price-div">
                <p>Price</p>
                <p>USD 150</p>
              </div>
              <hr className="mt-1" />
              <button
                onClick={() => setActiveCrumb(1)}
                className="btn w-100 selection-confirm"
              >
                Next
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
                  amount={"120"}
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
