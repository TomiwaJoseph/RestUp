import axios from "axios";
import store from "../store/store";
import {
  setBadRequest,
  setCurrentApartments,
  setFeaturedApartments,
  setHighestPriceSizeAndCapacity,
  setInternetError,
  setLoginUser,
  setPreloaderStatus,
  setRandomApartmentImage,
  setSingleApartment,
  setUserInfo,
  // setSingleApartment,
  // setTestPage,
} from "./roomActions";
import { toast } from "react-toastify";

const testPageUrl = "http://localhost:8000/api/test-page/";
const featuredApartmentsUrl = "http://localhost:8000/api/featured-apartments/";
const highestRoomPriceSizeAndCapacityUrl =
  "http://localhost:8000/api/highest-price-size-and-capacity/";
const allApartmentsUrl = "http://localhost:8000/api/apartments/";
const singleApartmentsUrl = "http://localhost:8000/api/apartment/";
const filteredApartmentsUrl = "http://localhost:8000/api/filtered-apartments/";
const demoUserUrl = "http://localhost:8000/api/login-demo-user/";
const userRegisterUrl = "http://localhost:8000/api/auth/register/";
const userLoginUrl = "http://localhost:8000/api/auth/login/";
const userLogoutUrl = "http://localhost:8000/api/auth/logout/";

const notify = (message, errorType) =>
  toast(message, {
    position: "top-center",
    autoClose: "3000",
    pauseOnHover: true,
    closeOnClick: true,
    type: errorType,
    theme: "colored",
  });

export const fetchTestPage = async () => {
  switchPreloader(true);
  await axios
    .get(testPageUrl)
    .then((response) => {
      console.log(response.data);
      store.dispatch(setFeaturedApartments(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      console.log(err);
      switchPreloader(false);
    });
};
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
      console.log(err);
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
      console.log(err);
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
// Get all apartments + random hero image from api
export const fetchSingleApartment = async (slug) => {
  // switchPreloader(true);
  await axios
    .get(singleApartmentsUrl + slug)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setSingleApartment(response.data));
      // switchPreloader(false);
    })
    .catch((err) => {
      console.log(err);
      // console.log(err.message);
      if (err.message === "Network Error") {
        store.dispatch(setInternetError(true));
      } else {
        console.log("bad request set...");
        store.dispatch(setBadRequest(true));
      }
      // switchPreloader(false);
    });
};
export const fetchFeaturedApartments = async () => {
  switchPreloader(true);
  await axios
    .get(featuredApartmentsUrl)
    .then((response) => {
      console.log(response.data);
      store.dispatch(setInternetError(false));
      store.dispatch(setFeaturedApartments(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      // console.log(err);
      store.dispatch(setInternetError(true));
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
      store.dispatch(setUserInfo(result.data.user_info));
      notify("Successful login! Enjoy your shopping.", "success");
      localStorage.setItem("token", result.data.token);
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
// Login the demo user
export const loginDemoUser = async () => {
  switchPreloader(true);
  await axios
    .get(demoUserUrl)
    .then((result) => {
      store.dispatch(setUserInfo(result.data.user_info));
      notify("Successful login! Enjoy your shopping.", "success");
      localStorage.setItem("token", result.data.token);
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
