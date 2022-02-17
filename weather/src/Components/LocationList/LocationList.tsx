import { FC } from "react";

import { DataLocationProps } from "../../utils/types";

import "./LocationList.scss";

interface LocationListProps {
  data: DataLocationProps[];
  onLocationWeather: (id: number, urlType: string) => Promise<void>;
  setWeatherType: (e: string) => void;
}

const LocationList: FC<LocationListProps> = ({
  data,
  onLocationWeather,
  setWeatherType,
}): JSX.Element => {
  const locations = data.length > 5 ? data.slice(0, 5) : data;
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
                  setWeatherType("current");
                }}
              >
                Get current weather
              </button>
              <button
                className="btn"
                onClick={() => {
                  onLocationWeather(location.id, "future");
                  setWeatherType("future");
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
