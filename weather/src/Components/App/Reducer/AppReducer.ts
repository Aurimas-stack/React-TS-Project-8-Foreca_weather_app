import React from "react";

import {
  LocationProps,
  FutureWeatherProps,
  WeatherProps,
} from "../../../utils/types";

export type Action =
  | { type: "defaultState" }
  | { type: "nextListPage" }
  | { type: "previousListPage" }
  | { type: "selectListPage"; value: number }
  | { type: "searchLocation"; value: string }
  | { type: "error"; value: string }
  | { type: "showLoading"; value: boolean }
  | { type: "showCurrentWeather"; value: boolean }
  | { type: "showLocationList"; value: boolean }
  | { type: "showFutureWeather"; value: boolean }
  | { type: "location"; value: LocationProps[] }
  | { type: "futureWeather"; value: FutureWeatherProps[] }
  | { type: "currentWeather"; value: WeatherProps[] };

export interface InitialState {
  searchLocation: string;
  locationListPageNumber: number;
  error: string;
  loading: boolean;
  showCurrentWeather: boolean;
  showLocationList: boolean;
  showFutureWeather: boolean;
  location: LocationProps[];
  currentWeather: WeatherProps[];
  futureWeather: FutureWeatherProps[];
}

export const defaultState: InitialState = {
  searchLocation: "",
  locationListPageNumber: 1,
  error: "",
  loading: false,
  showCurrentWeather: false,
  showLocationList: false,
  showFutureWeather: false,
  location: [],
  currentWeather: [],
  futureWeather: [],
};

export const appReducer: React.Reducer<InitialState, Action> = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "searchLocation":
      return { ...state, searchLocation: action.value };
    case "nextListPage":
      return {
        ...state,
        locationListPageNumber: state.locationListPageNumber + 1,
      };
    case "previousListPage":
      return {
        ...state,
        locationListPageNumber: state.locationListPageNumber - 1,
      };
    case "selectListPage":
      return { ...state, locationListPageNumber: action.value };
    case "error":
      return { ...state, error: action.value };
    case "location":
      return { ...state, location: action.value };
    case "showLoading":
      return { ...state, loading: action.value };
    case "showCurrentWeather":
      return { ...state, showCurrentWeather: action.value };
    case "showLocationList":
      return { ...state, showLocationList: action.value };
    case "showFutureWeather":
      return { ...state, showFutureWeather: action.value };
    case "currentWeather":
      return { ...state, currentWeather: action.value };
    case "futureWeather":
      return { ...state, futureWeather: action.value };
    case "defaultState":
      return defaultState;
    default:
      return defaultState;
  }
};
