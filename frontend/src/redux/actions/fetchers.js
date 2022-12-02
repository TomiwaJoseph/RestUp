import axios from "axios";
import store from "../store/store";
import {
  setFeaturedApartments,
  setHighestPriceAndCapacity,
  setInternetError,
  setPreloaderStatus,
  // setSingleApartment,
  // setTestPage,
} from "./roomActions";
// import { toast } from "react-toastify";

const testPageUrl = "http://localhost:8000/api/test-page/";
const featuredApartmentsUrl = "http://localhost:8000/api/featured-apartments/";
const highestRoomPriceAndCapacityUrl =
  "http://localhost:8000/api/highest-price-and-capacity/";
// const highestRoomCapacityUrl = "http://localhost:8000/api/highest-capacity/";

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};

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
export const fetchFeaturedApartments = async () => {
  switchPreloader(true);
  await axios
    .get(featuredApartmentsUrl)
    .then((response) => {
      console.log(response.data);
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
export const fetchHighestPriceAndCapacity = async () => {
  switchPreloader(true);
  await axios
    .get(highestRoomPriceAndCapacityUrl)
    .then((response) => {
      store.dispatch(setHighestPriceAndCapacity(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
