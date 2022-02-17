import { WeatherProps } from "../../utils/types";
import { FC } from "react";

interface SelectedLocationProps {
  weather: WeatherProps;
}

const SelectedLocationCurrent: FC<SelectedLocationProps> = ({
  weather,
}): JSX.Element => {
  return (
    <div>
      <div>{weather.temperature} Celsius</div>
      <div>cloudiness: {weather.cloudiness},</div>
      <div>humidity: {weather.relHumidity},</div>
      <div>windSpeed: {weather.windSpeed} m/s,</div>
      <div>UV index: {weather.uvIndex}</div>
    </div>
  );
};

export default SelectedLocationCurrent;
