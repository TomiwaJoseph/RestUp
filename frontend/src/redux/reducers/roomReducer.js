import { ActionTypes } from "../actions/action-types";

const globalState = {
  singleApartmentData: [],
  featuredApartmentData: [],
  currentApartmentData: [],
  randomApartmentImage: "",
  testPageData: [],
  highestRoomPrice: 360,
  highestCapacity: 6,
  highestRoomPriceAndCapacity: {},
  badRequest: false,
  noInternet: false,
  fetchingData: false,
  backendUrl: "http://localhost:8000",
};

export const roomReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SINGLE_APARTMENT:
      return {
        ...state,
        singleApartmentData: payload,
      };
    case ActionTypes.SET_FEATURED_DATA:
      return {
        ...state,
        featuredApartmentData: payload,
      };
    case ActionTypes.GET_ALL_APARTMENTS:
      return {
        ...state,
        currentApartmentData: payload,
      };
    case ActionTypes.SET_HIGHEST_PRICE_AND_CAPACITY_DATA:
      return {
        ...state,
        highestRoomPriceAndCapacity: payload,
      };
    case ActionTypes.SET_RANDOM_APARTMENT_IMAGE:
      return {
        ...state,
        randomApartmentImage: payload,
      };
    case ActionTypes.SET_TEST_PAGE_DATA:
      return {
        ...state,
        testPageData: payload,
      };
    case ActionTypes.IS_FETCHING_DATA:
      return {
        ...state,
        fetchingData: payload,
      };
    case ActionTypes.NO_INTERNET:
      return {
        ...state,
        noInternet: payload,
      };
    default:
      return state;
  }
};
