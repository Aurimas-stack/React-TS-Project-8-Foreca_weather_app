import React, { useReducer } from "react";

import { appReducer, defaultState } from "./Reducer/AppReducer";

import Loader from "./loader/Loader";
import Input from "./Input/Input";
import LocationList from "../LocationList/LocationList";
import SelectedLocationCurrent from "../SelectedLocation/SelectedLocationCurrent";
import SelectedLocationFuture from "../SelectedLocation/SelectedLocationFuture";

import { apiKey } from "../../utils/Api";
import { mainUrl } from "../../utils/mainUrl";
import { getError } from "../../utils/getError";
import { checkLocationString } from "../../utils/locationRegex";

import "./../Styles/styles.scss";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  const handleLocation = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    dispatch({ type: "defaultState", value: defaultState });

    if (state.searchLocation.length === 0) {
      dispatch({ type: "error", value: "Type in a location." });
      return;
    }
    if (state.searchLocation.length > 30) {
      dispatch({ type: "error", value: "Your location name is too long." });
      return;
    }
    if (!checkLocationString(state.searchLocation)) {
      dispatch({
        type: "error",
        value: "Only letters and spaces are allowed.",
      });
      return;
    }

    dispatch({ type: "showLoading", value: true });

    try {
      const response: Response = await fetch(
        `${mainUrl}location/search/${state.searchLocation.toLocaleLowerCase()}?`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );
      const data = await response.json();
      if (data.locations.length === 0) {
        dispatch({ type: "error", value: "Your location doesn't exist." });
      }
      dispatch({ type: "location", value: data.locations });
      dispatch({ type: "showLocationList", value: true });
    } catch (error) {
      dispatch({ type: "error", value: getError(error) });
    }

    dispatch({ type: "showLoading", value: false });
  };

  const handleLocationWeather = async (
    id: number,
    urlType: string
  ): Promise<void> => {
    const currentUrl = `${mainUrl}current/${id}?alt=0&tempunit=C&windunit=MS&tz=Europe`;
    const futureUrl = `${mainUrl}forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
    const url = urlType === "current" ? currentUrl : futureUrl;

    try {
      const response: Response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });
      const data = await response.json();
      urlType === "current"
        ? dispatch({ type: "currentWeather", value: [data.current] })
        : dispatch({ type: "futureWeather", value: data.forecast });
    } catch (error) {
      dispatch({ type: "error", value: getError(error) });
    }
  };

  return (
    <div className="App">
      <Input onLocation={handleLocation} state={state} dispatch={dispatch} />
      {state.loading === true ? (
        <Loader />
      ) : (
        <>
          {state.showLocationList && (
            <LocationList
              state={state}
              dispatch={dispatch}
              onLocationWeather={handleLocationWeather}
            />
          )}
          {state.showCurrentWeather && (
            <SelectedLocationCurrent state={state} dispatch={dispatch} />
          )}
          {state.showFutureWeather && (
            <SelectedLocationFuture state={state} dispatch={dispatch} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
