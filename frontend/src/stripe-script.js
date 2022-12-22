const API_ENDPOINT = "http://localhost:8000/api";

export const stripePaymentMethodHandler = async (data, cb) => {
  const { amount, userInfo, stayDuration, roomApartmentSlug, result } = data;
  if (result.error) {
    // show error in payment form
    cb(result);
  } else {
    const paymentResponse = await stripePayment({
      payment_method_id: result.paymentMethod.id,
      name: result.paymentMethod.billing_details.name,
      email: result.paymentMethod.billing_details.email,
      amount: amount,
      userInfo: userInfo,
      stayDuration: stayDuration,
      roomApartmentSlug: roomApartmentSlug,
      token: localStorage.getItem("restupToken"),
    });
    cb(paymentResponse);
  }
};

// place backend API call for payment
const stripePayment = async (data) => {
  const res = await fetch(`${API_ENDPOINT}/save-stripe-info/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
