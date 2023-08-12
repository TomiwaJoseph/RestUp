import axios from "axios";

const API_ENDPOINT = "https://restup.onrender.com/api";

export const stripePaymentMethodHandler = async (data) => {
  const { amount, userInfo, stayDuration, roomApartmentSlug, result } = data;
  let body = JSON.stringify({
    payment_method_id: result.id,
    name: result.billing_details.name,
    email: result.billing_details.email,
    amount: amount,
    userInfo: userInfo,
    stayDuration: stayDuration,
    roomApartmentSlug: roomApartmentSlug,
    token: localStorage.getItem("restupToken"),
  });
  const res = await axios.post(`${API_ENDPOINT}/save-stripe-info/`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
