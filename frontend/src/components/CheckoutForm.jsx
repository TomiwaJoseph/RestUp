import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "../stripe-script";
import "./checkoutform.css";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentFormSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    setErrorMsg("");
    let name = props.userInfo[0] + " " + props.userInfo[1];
    let email = props.userInfo[2];

    const paymentMethodObj = {
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name,
        email,
      },
    };
    const paymentMethodResult = await stripe.createPaymentMethod(
      paymentMethodObj
    );

    stripePaymentMethodHandler(
      {
        amount: props.amount,
        userInfo: props.userInfo,
        stayDuration: props.stayDuration,
        roomApartmentSlug: props.roomApartmentSlug,
        result: paymentMethodResult,
      },
      handleResponse
    );
  };
  // callback method to handle the response
  const handleResponse = (response) => {
    setLoading(false);
    if (response.error) {
      setErrorMsg(
        typeof response.error === "string"
          ? response.error
          : response.error.message
      );
      return;
    }
    props.setPaymentCompleted(response.message === "Success" ? true : false);
  };

  return (
    <>
      <form onSubmit={handlePaymentFormSubmit} className="stripe-form">
        <div className="row">
          <div className="col-md-12 mb-3">
            <label htmlFor="cc-number">Card Number</label>
            <CardNumberElement
              id="cc-number"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="expiry">Expiration Date</label>
            <CardExpiryElement
              id="expiry"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cvc">CVC</label>
            <CardCvcElement
              id="cvc"
              className="form-control"
              options={CARD_ELEMENT_OPTIONS}
            />
          </div>
        </div>
        <hr className="mb-4" />
        <button className="btn btn-dark w-100" type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border text-light" role="status">
              {/* <span className="sr-only">Loading...</span> */}
            </div>
          ) : (
            `Pay $${props.amount}`
          )}
        </button>
        {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
      </form>
    </>
  );
};
export default CheckoutForm;
