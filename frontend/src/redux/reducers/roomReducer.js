import { ActionTypes } from "../actions/action-types";

const globalState = {
  singleRoomData: [],
  featuredRoomsData: [..."abc"],
  allRoomsData: [..."abcdefghijk"],
  testPageData: [],
  badRequest: false,
  noInternet: false,
  fetchingData: false,
  backendUrl: "http://localhost:8000",
};

export const roomReducer = (state = globalState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_SINGLE_ROOM:
      return {
        ...state,
        singleRoomData: payload,
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
