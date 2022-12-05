import axios from "axios";
import store from "../store/store";
import {
  setCurrentApartments,
  setFeaturedApartments,
  setHighestPriceAndCapacity,
  setInternetError,
  setPreloaderStatus,
  setRandomApartmentImage,
  setSingleApartment,
  // setSingleApartment,
  // setTestPage,
} from "./roomActions";
// import { toast } from "react-toastify";

const testPageUrl = "http://localhost:8000/api/test-page/";
const featuredApartmentsUrl = "http://localhost:8000/api/featured-apartments/";
const highestRoomPriceAndCapacityUrl =
  "http://localhost:8000/api/highest-price-and-capacity/";
const allApartmentsUrl = "http://localhost:8000/api/apartments/";
const singleApartmentsUrl = "http://localhost:8000/api/apartment/";
const filteredApartmentsUrl = "http://localhost:8000/api/filtered-apartments/";

// Turn preloader on or off
export const switchPreloader = (status) => {
  store.dispatch(setPreloaderStatus(status));
};
// Get apartments based on user filter from api
export const fetchFilteredApartments = async (filter_values) => {
  switchPreloader(true);
  let startDate = filter_values[0];
  let endDate = filter_values[1];
  let priceMinValue = filter_values[2];
  let priceMaxValue = filter_values[3];
  let capacityMinValue = filter_values[4];
  let capacityMaxValue = filter_values[5];
  let body = JSON.stringify({
    startDate: startDate,
    endDate: endDate,
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
      console.log(response.data);
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
  switchPreloader(true);
  await axios
    .get(singleApartmentsUrl + slug)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setSingleApartment(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      console.log(err);
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
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
export const fetchHighestPriceAndCapacity = async () => {
  switchPreloader(true);
  await axios
    .get(highestRoomPriceAndCapacityUrl)
    .then((response) => {
      store.dispatch(setInternetError(false));
      store.dispatch(setHighestPriceAndCapacity(response.data));
      switchPreloader(false);
    })
    .catch((err) => {
      store.dispatch(setInternetError(true));
      switchPreloader(false);
    });
};
