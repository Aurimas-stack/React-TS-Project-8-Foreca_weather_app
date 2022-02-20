import { FC } from "react";

import { Action } from "../../App/Reducer/AppReducer";

import { LocationProps } from "../../../utils/types";

export interface LocationListProps {
  dispatch: React.Dispatch<Action>;
  onLocationWeather: (
    id: number,
    urlType: string,
    name?: string
  ) => Promise<void>;
  data: LocationProps;
}

const LocationList: FC<LocationListProps> = ({
  onLocationWeather,
  data,
  dispatch,
}): JSX.Element | null => {
  if (data === undefined) return null;

  return (
    <ul className="list_container">
      <li className="location">
        {data.name}, {data.adminArea}, {data.country}
        <div className="getWeatherBtn_cont">
          <button
            className="btn"
            onClick={() => {
              onLocationWeather(data.id, "current", data.name);
              dispatch({ type: "showLocationList", value: false });
              dispatch({ type: "showCurrentWeather", value: true });
            }}
          >
            Get current weather
          </button>
          <button
            className="btn"
            onClick={() => {
              onLocationWeather(data.id, "future");
              dispatch({ type: "showLocationList", value: false });
              dispatch({ type: "showFutureWeather", value: true });
            }}
          >
            Get 7 day weather
          </button>
        </div>
      </li>
    </ul>
  );
};

export default LocationList;
