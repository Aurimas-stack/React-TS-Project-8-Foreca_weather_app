import { FutureWeatherProps } from "../../utils/types";
import { FC } from "react";

interface SelLocFutProps {
  futureWeather: FutureWeatherProps[];
}

const SelectedLocationFuture: FC<SelLocFutProps> = ({ futureWeather }) => {
  return (
    <div>
      {futureWeather.map((weathers, index) => {
        return (
          <ul key={index}>
            <li>Date: {weathers.date},</li>
            <li>Description: {weathers.symbolPhrase},</li>
            <li>cloudiness: {weathers.cloudiness},</li>
            <li>Temp. (celsius) - MAX: {weathers.maxTemp}, MIN:{weathers.minTemp},</li>
            <li>Real Humidity - MAX:{weathers.maxRelHumidity}, MIN:{weathers.minRelHumidity},</li>
            <li>UV index: {weathers.uvIndex},</li>
            <li>Maximum wind speeds: {weathers.maxWindSpeed} m/s.</li>
          </ul>
        );
      })}
    </div>
  );
};

export default SelectedLocationFuture;
