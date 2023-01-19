import { ActionTypes } from "../actions/action-types";

const globalState = {
  singleApartmentData: [],
  singleRoomDetails: {},
  featuredApartmentData: [],
  currentApartmentData: [],
  randomApartmentImage: "",
  userInfo: {},
  dashboard_info: {},
  highestRoomPrice: 360,
  highestCapacity: 6,
  highestRoomPriceSizeAndCapacity: {},
  badRequest: false,
  noInternet: false,
  fetchingData: false,
  isAuthenticated: false,
  backendUrl: "https://rest.up.railway.app",
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
    case ActionTypes.SET_SINGLE_ROOM_DETAILS:
      return {
        ...state,
        singleRoomDetails: payload,
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
    case ActionTypes.USER_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    case ActionTypes.SET_DASHBOARD_INFO:
      return {
        ...state,
        dashboard_info: payload,
      };
    case ActionTypes.REMOVE_SELECTED_SINGLE_APARTMENT:
      return {
        ...state,
        singleApartmentData: [],
      };
    case ActionTypes.REMOVE_RANDOM_IMAGE:
      return {
        ...state,
        randomApartmentImage: "",
      };
    case ActionTypes.REMOVE_SINGLE_ROOM_DETAILS:
      return {
        ...state,
        singleRoomDetails: {},
      };
    case ActionTypes.REMOVE_USER_INFO:
      return {
        ...state,
        userInfo: {},
      };
    default:
      return state;
  }
};
