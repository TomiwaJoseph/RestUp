import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { stripePaymentMethodHandler } from "../stripe-api";
import "./checkoutform.css";
import { toast } from "react-toastify";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontSize: "15px",
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
  const notify = (message, errorType) =>
    toast(message, {
      position: "top-center",
      autoClose: "3000",
      pauseOnHover: true,
      closeOnClick: true,
      type: errorType,
      theme: "colored",
    });

  const stripe = useStripe();
  const elements = useElements();
  const handlePaymentFormSubmit = async (event) => {
    try {
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
      let phone = props.userInfo[3];

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email,
          phone,
        },
      });

      // console.log("Here is the payment method...");
      // console.log(paymentMethod);
      // console.log(" ");

      if (error) {
        setLoading(false);
        setErrorMsg(error.message);
      } else {
        // console.log("Sending details to server...");
        stripePaymentMethodHandler({
          amount: props.amount,
          userInfo: props.userInfo,
          stayDuration: props.stayDuration,
          roomApartmentSlug: props.roomApartmentSlug,
          result: paymentMethod,
        })
          .then((response) => {
            // console.log(response);
            // console.log(response.data.message);
            props.setPaymentCompleted(
              response.data.message === "Success" ? true : false
            );
          })
          .catch((err) => {
            setLoading(false);
            setErrorMsg(err.response.data.error);
          });
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg("Network communication failed, try again.");
      notify("Your internet connection is bad. Try again later.", "info");
    }
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
        <hr className="mb-3 mt-1" />
        <button className="btn btn-dark w-100" type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            `Pay $${props.amount}`
          )}
        </button>
        {errorMsg && <div className="text-danger mt-3">{errorMsg}</div>}
      </form>
    </>
  );
};
export default CheckoutForm;
