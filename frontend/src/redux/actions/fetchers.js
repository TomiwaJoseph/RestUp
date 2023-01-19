import axios from "axios";
import store from "../store/store";
import {
  removeUserInfo,
  setBadRequest,
  setCurrentApartments,
  setDashboardInfo,
  setFeaturedApartments,
  setHighestPriceSizeAndCapacity,
  setInternetError,
  setLoginUser,
  setPreloaderStatus,
  setRandomApartmentImage,
  setSingleApartment,
  setSingleRoomDetails,
  setUserInfo,
} from "./roomActions";
import { toast } from "react-toastify";

const featuredApartmentsUrl =
  "https://rest.up.railway.app/api/featured-apartments/";
const highestRoomPriceSizeAndCapacityUrl =
  "https://rest.up.railway.app/api/highest-price-size-and-capacity/";
const allApartmentsUrl = "https://rest.up.railway.app/api/apartments/";
const singleApartmentsUrl = "https://rest.up.railway.app/api/apartment/";
const singleRoomDetailsUrl = "https://rest.up.railway.app/api/get-single-room/";
const filteredApartmentsUrl =
  "https://rest.up.railway.app/api/filtered-apartments/";
const demoUserUrl = "https://rest.up.railway.app/api/login-demo-user/";
const userRegisterUrl = "https://rest.up.railway.app/api/auth/register/";
const userLoginUrl = "https://rest.up.railway.app/api/auth/login/";
const userLogoutUrl = "https://rest.up.railway.app/api/auth/logout/";
const fetchDashboardInfoUrl = "https://rest.up.railway.app/api/dashboard-info/";
const cancelBookingUrl = "https://rest.up.railway.app/api/cancel-booking/";

const notify = (message, errorType) =>
  toast(message, {
    position: "top-center",
    autoClose: "3000",
    pauseOnHover: true,
    closeOnClick: true,
    type: errorType,
    theme: "colored",
  });

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};
// Get apartments based on user filter from api
export const fetchFilteredApartments = async (filter_values) => {
  switchPreloader(true);
  let sizeMinValue = filter_values[0];
  let sizeMaxValue = filter_values[1];
  let priceMinValue = filter_values[2];
  let priceMaxValue = filter_values[3];
  let capacityMinValue = filter_values[4];
  let capacityMaxValue = filter_values[5];
  let body = JSON.stringify({
    sizeMinValue: sizeMinValue,
    sizeMaxValue: sizeMaxValue,
    priceMinValue: priceMinValue,
    priceMaxValue: priceMaxValue,
    capacityMinValue: capacityMinValue,
    capacityMaxValue: capacityMaxValue,
  });
  await axios
    .post(filteredApartmentsUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      store.dispatch(setCurrentApartments(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      switchPreloader(false);
    });
};
// Get all apartments + random hero image from api
export const fetchAllApartments = async () => {
  switchPreloader(true);
  await axios
    .get(allApartmentsUrl)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setCurrentApartments(response.data.slice(0, -1)));
      store.dispatch(setRandomApartmentImage(response.data.slice(-1)));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
// Get single apartment details from api
export const fetchSingleApartment = async (slug) => {
  await axios
    .get(singleApartmentsUrl + slug)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setSingleApartment(response.data));
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        store.dispatch(setBadRequest(true));
      }
    });
};
// Get featured apartments from api
export const fetchFeaturedApartments = async () => {
  switchPreloader(true);
  await axios
    .get(featuredApartmentsUrl)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setFeaturedApartments(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
// Get single room details from api
export const fetchSingleRoomDetails = async (slugs) => {
  switchPreloader(true);
  let apartmentSlug = slugs[0];
  let roomSlug = slugs[1];
  let body = JSON.stringify({
    apartmentSlug: apartmentSlug,
    roomSlug: roomSlug,
  });
  await axios
    .post(singleRoomDetailsUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      store.dispatch(setSingleRoomDetails(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        store.dispatch(setBadRequest(true));
      }
      switchPreloader(false);
    });
};
// Get the highest room price and capacity the hotel has from api
export const fetchHighestPriceSizeAndCapacity = async () => {
  switchPreloader(true);
  await axios
    .get(highestRoomPriceSizeAndCapacityUrl)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setHighestPriceSizeAndCapacity(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
// Get the bookings of logged in user from api
export const fetchDashboardInfo = async () => {
  let token = localStorage.getItem("restupToken");
  let config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  await axios
    .get(fetchDashboardInfoUrl, config)
    .then((response) => {
      store.dispatch(setDashboardInfo(response.data));
      store.dispatch(setInternetError(false));
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
    });
};
// Cancel user booking provided correct parameters are present
export const cancelBooking = async (refCode) => {
  switchPreloader(true);
  let token = localStorage.getItem("restupToken");
  let body = JSON.stringify({
    ref: refCode,
    token: token,
  });
  await axios
    .post(cancelBookingUrl, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
    .then((result) => {
      store.dispatch(setInternetError(false));
      notify(
        "Successful cancelled. Your funds will be refunded shortly.",
        "success"
      );
      store.dispatch(setDashboardInfo(result.data));
      switchPreloader(false);
    })
    .catch((err) => {
      switchPreloader(false);
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else if (err.response.data.error === "Unauthorized user") {
        notify("You can't cancel this booking", "info");
      }
    });
};
// Sign in user with token if correct credentials are provided
export const signInUser = async (signInData) => {
  switchPreloader(true);
  let body = JSON.stringify({
    email: signInData[0],
    password: signInData[1],
  });
  await axios
    .post(userLoginUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      notify("Successful login! Your rest is RestUp assured.", "success");
      localStorage.setItem("restupToken", result.data.token);
      delete result.data.token;
      store.dispatch(setUserInfo(result.data));
      store.dispatch(setLoginUser(true));
      switchPreloader(false);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Incorrect email or password! Try again.", "error");
      switchPreloader(false);
      localStorage.removeItem("token");
    });
};
// Know if user is authenticated
export const authenticateUser = async (authenticateUrl, callback) => {
  let token = localStorage.getItem("restupToken");
  await axios
    .get(authenticateUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      callback(response);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
    });
};
// Login the demo user
export const loginDemoUser = async () => {
  switchPreloader(true);
  await axios
    .get(demoUserUrl)
    .then((result) => {
      store.dispatch(setUserInfo(result.data.user_info));
      notify("Successful login! Your rest is RestUp assured.", "success");
      localStorage.setItem("restupToken", result.data.token);
      store.dispatch(setLoginUser(true));
      switchPreloader(false);
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("Something unexpected happened!", "error");
      switchPreloader(false);
    });
};
// Log out the user with token
export const logOutUser = async () => {
  let token = localStorage.getItem("restupToken");
  await axios
    .get(userLogoutUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((result) => {
      store.dispatch(setLoginUser(false));
      localStorage.removeItem("restupToken");
      document.getElementById("home").click();
      store.dispatch(removeUserInfo());
      notify("Logout successful!", "info");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        notify("Unable to log out! Try again.", "error");
      }
    });
};
// Sign up users with the credentials that are provided
export const signUpUser = async (signUpData) => {
  switchPreloader(true);
  let body = JSON.stringify({
    first_name: signUpData[0],
    last_name: signUpData[1],
    email: signUpData[2],
    password: signUpData[3],
  });
  await axios
    .post(userRegisterUrl, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((result) => {
      switchPreloader(false);
      document.getElementById("login").click();
      notify("Account created successfully! You can login now.", "success");
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      }
      notify("You already have an account with us! Please login.", "info");
      switchPreloader(false);
      localStorage.removeItem("token");
    });
};
