import { WeatherProps } from "../../utils/types";
import { FC } from "react";

import "./SelectedLocation.scss";

interface SelectedLocationProps {
  weather: WeatherProps;
}

const SelectedLocationCurrent: FC<SelectedLocationProps> = ({
  weather,
}): JSX.Element => {
  return (
    <ul className="selectedList_cont"> 
      <li>{weather.temperature} Celsius</li>
      <li>cloudiness: {weather.cloudiness},</li>
      <li>humidity: {weather.relHumidity},</li>
      <li>windSpeed: {weather.windSpeed} m/s,</li>
      <li>UV index: {weather.uvIndex}</li>
    </ul>
  );
};

export default SelectedLocationCurrent;
