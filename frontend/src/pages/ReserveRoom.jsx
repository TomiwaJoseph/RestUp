import { NavLink, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "./page-styles.css";
import roomImg2 from "../statics/room-2.jpg";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState, useEffect } from "react";

const PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(PUBLISHABLE_KEY);

const ReserveRoom = () => {
  const { roomSlug } = useParams();
  // const [showPaymentCompleted, setShowPaymentCompleted] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [activeCrumb, setActiveCrumb] = useState(0);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const successMessage = () => {
    return (
      <div className="success-msg">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-check2"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
          />
        </svg>
        <div className="title">Payment Successful!</div>
        <p>Enjoy your stay with us.</p>
      </div>
    );
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  useEffect(() => {
    if (paymentCompleted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [paymentCompleted]);

  const checkDateSelection = () => {
    setActiveCrumb(1);
  };

  return (
    <>
      <div className="room__header">
        <div className="img-container">
          <img src={roomImg2} className="img-fluid" alt="heroku-promises" />
        </div>
        <div className="nav-hero"></div>
        <div className="name__hero">
          <h1>Single Economy</h1>
          <hr className="accent" />
        </div>
      </div>
      <div className="container">
        {paymentCompleted ? (
          successMessage()
        ) : (
          <>
            <div className="row">
              <div className="col-md-8 mx-auto mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => setActiveCrumb(0)}
                    className={
                      activeCrumb === 0 ? "btn crumb active" : "btn crumb"
                    }
                  >
                    Date of Stay
                  </button>
                  <div className="crumb-demarcate"></div>
                  <button
                    onClick={() => setActiveCrumb(1)}
                    className={
                      activeCrumb === 1 ? "btn crumb active" : "btn crumb"
                    }
                  >
                    Payment Details
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              {activeCrumb === 0 && (
                <div className="mx-auto col-md-5 my-3 text-center">
                  <DateRange
                    editableDateInputs={false}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                  <hr className="mt-1" />
                  <button
                    onClick={checkDateSelection}
                    className="btn date-confirm"
                  >
                    Continue
                  </button>
                </div>
              )}
              {activeCrumb === 1 && (
                <div className="mx-auto col-md-5 mb-3">
                  {/* <h3 className="checkout_title">Payment Details</h3> */}
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      amount={"120"}
                      setPaymentCompleted={setPaymentCompleted}
                      // orderInfo={orderInfo}
                    />
                  </Elements>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReserveRoom;
