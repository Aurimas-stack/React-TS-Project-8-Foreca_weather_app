import { FC } from "react";

import { Action, InitialState } from "../App/Reducer/AppReducer";

interface LocationListProps {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
  onLocationWeather: (id: number, urlType: string) => Promise<void>;
}

const LocationList: FC<LocationListProps> = ({
  state,
  onLocationWeather,

  dispatch,
}): JSX.Element | null => {
  if (state.location.length === 0) return null;

  const locations =
    state.location.length > 5 ? state.location.slice(0, 5) : state.location;
  return (
    <ul className="list_container">
      {locations.map((location, index) => {
        return (
          <li key={index} className="location">
            {location.name}, {location.adminArea}, {location.country}
            <div className="getWeatherBtn_cont">
              <button
                className="btn"
                onClick={() => {
                  onLocationWeather(location.id, "current");
                  dispatch({ type: "showLocationList", value: false });
                  dispatch({ type: "showCurrentWeather", value: true });
                }}
              >
                Get current weather
              </button>
              <button
                className="btn"
                onClick={() => {
                  onLocationWeather(location.id, "future");
                  dispatch({ type: "showLocationList", value: false });
                  dispatch({ type: "showFutureWeather", value: true });
                }}
              >
                Get 7 day weather
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default LocationList;
