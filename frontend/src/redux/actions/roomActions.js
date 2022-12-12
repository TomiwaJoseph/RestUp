import { ActionTypes } from "./action-types";

export const setTestPage = (data) => {
  return {
    type: ActionTypes.SET_TEST_PAGE_DATA,
    payload: data,
  };
};
export const setFeaturedApartments = (data) => {
  return {
    type: ActionTypes.SET_FEATURED_DATA,
    payload: data,
  };
};
export const setCurrentApartments = (data) => {
  return {
    type: ActionTypes.GET_ALL_APARTMENTS,
    payload: data,
  };
};
export const setRandomApartmentImage = (data) => {
  return {
    type: ActionTypes.SET_RANDOM_APARTMENT_IMAGE,
    payload: data,
  };
};
export const setHighestPriceAndCapacity = (data) => {
  return {
    type: ActionTypes.SET_HIGHEST_PRICE_AND_CAPACITY_DATA,
    payload: data,
  };
};
export const setSingleApartment = (data) => {
  return {
    type: ActionTypes.GET_SINGLE_APARTMENT,
    payload: data,
  };
};
export const removeSelectedApartment = (data) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
  };
};
export const setPreloaderStatus = (status) => {
  return {
    type: ActionTypes.IS_FETCHING_DATA,
    payload: status,
  };
};
export const setInternetError = (status) => {
  return {
    type: ActionTypes.NO_INTERNET,
    payload: status,
  };
};
export const setBadRequest = (value) => {
  return {
    type: ActionTypes.SET_BAD_REQUEST,
    payload: value,
  };
};
