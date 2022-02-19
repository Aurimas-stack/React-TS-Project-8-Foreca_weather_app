import React, { useReducer } from "react";

import { appReducer, defaultState } from "./Reducer/AppReducer";

import Loader from "./loader/Loader";
import Input from "./Input/Input";
import LocationListPagination from "../LocationList/Pagination/LocationListPagination";
import SelectedLocationCurrent from "../SelectedLocation/SelectedLocationCurrent";
import SelectedLocationFuture from "../SelectedLocation/SelectedLocationFuture";

import { getError } from "../../utils/getError";
import { checkLocationString } from "../../utils/locationRegex";
import { locationFetch, weatherFetch } from "../../utils/getWeather";
import { postLocation, postCurrentWeather  } from "../../utils/postToServer";

import "./../Styles/styles.scss";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  const handleLocation = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    dispatch({ type: "defaultState" });

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
      const response: Response = await locationFetch(state.searchLocation);
      const data = await response.json();

      if (data.locations.length === 0) {
        dispatch({ type: "error", value: "Your location doesn't exist." });
        dispatch({ type: "showLoading", value: false });
        return;
      }

      dispatch({ type: "location", value: data.locations });
      await postLocation(state.searchLocation);
      dispatch({ type: "showLocationList", value: true });

    } catch (error) {
      dispatch({ type: "error", value: getError(error) });
    }

    dispatch({ type: "showLoading", value: false });
  };

  const handleLocationWeather = async (
    id: number,
    urlType: string,
    name?: string
  ): Promise<void> => {
    try {
      const response: Response = await weatherFetch(id, urlType);
      const data = await response.json();

      await postCurrentWeather(name, data.current)

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
            <LocationListPagination
              dataLimit={5}
              pageLimit={3}
              pageNumber={state.locationListPageNumber}
              data={state.location}
              dispatch={dispatch}
              handleLocationWeather={handleLocationWeather}
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
