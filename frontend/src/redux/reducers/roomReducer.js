import { ActionTypes } from "../actions/action-types";

const globalState = {
  singleApartmentData: [],
  featuredApartmentData: [],
  currentApartmentData: [],
  randomApartmentImage: "",
  testPageData: [],
  userInfo: {},
  highestRoomPrice: 360,
  highestCapacity: 6,
  highestRoomPriceSizeAndCapacity: {},
  badRequest: false,
  noInternet: false,
  fetchingData: false,
  isAuthenticated: false,
  backendUrl: "http://localhost:8000",
};

export const roomReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SINGLE_APARTMENT:
      return {
        ...state,
        singleApartmentData: payload,
      };
    // case ActionTypes.REMOVE_SELECTED_PRODUCT:
    //   return {
    //     ...state,
    //     singleApartmentData: [],
    //   };
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
    case ActionTypes.SET_HIGHEST_PRICE_SIZE_AND_CAPACITY_DATA:
      return {
        ...state,
        highestRoomPriceSizeAndCapacity: payload,
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
    case ActionTypes.SET_BAD_REQUEST:
      return {
        ...state,
        badRequest: payload,
      };
    case ActionTypes.NO_INTERNET:
      return {
        ...state,
        noInternet: payload,
      };
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    default:
      return state;
  }
};
