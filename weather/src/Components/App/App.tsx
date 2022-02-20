import React, { useReducer } from "react";

import { appReducer, defaultState } from "./Reducer/AppReducer";

import Loader from "./loader/Loader";
import Input from "./Input/Input";
import LocationListPagination from "../LocationList/Pagination/LocationListPagination";
import SelectedLocationCurrent from "../SelectedLocation/SelectedLocationCurrent";
import SelectedLocationFuture from "../SelectedLocation/SelectedLocationFuture";

import { getError } from "../../utils/getError";
import { validateInput } from "../../utils/validateInput";
import { locationFetch, weatherFetch } from "../../utils/getWeather";
import {
  postSearchedLocation,
  postSearchedCurrentWeather,
} from "../../utils/postToServer";

import "./../Styles/styles.scss";

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  const handleLocation = async (e: React.FormEvent): Promise<void> => {
    let inputValidation: { error: string; value: boolean };
    e.preventDefault();
    dispatch({ type: "defaultState" });

    inputValidation = validateInput(state.searchLocation);

    postSearchedLocation(state.searchLocation);

    if (inputValidation.value === true) {
      dispatch({ type: "error", value: inputValidation.error });
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

      if (data === undefined) {
        dispatch({ type: "error", value: "Couldn't find weather!" });
        return;
      }

      postSearchedCurrentWeather(name, data.current);

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
