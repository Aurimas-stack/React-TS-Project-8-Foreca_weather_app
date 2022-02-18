import React from "react";

import {
  LocationProps,
  FutureWeatherProps,
  WeatherProps,
} from "../../../utils/types";

export type Action =
  | { type: "searchLocation"; value: string }
  | { type: "error"; value: string }
  | { type: "showLoading"; value: boolean }
  | { type: "showCurrentWeather"; value: boolean }
  | { type: "showLocationList"; value: boolean }
  | { type: "showFutureWeather"; value: boolean }
  | { type: "location"; value: LocationProps[] }
  | { type: "futureWeather"; value: FutureWeatherProps[] }
  | { type: "currentWeather"; value: WeatherProps[] }
  | { type: "defaultState"; value: InitialState };

export interface InitialState {
  searchLocation: string;
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
) => {
  switch (action.type) {
    case "searchLocation":
      return { ...state, searchLocation: action.value };
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
