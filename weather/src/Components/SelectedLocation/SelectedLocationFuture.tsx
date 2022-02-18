import { FC } from "react";

import { Action, InitialState } from "../App/Reducer/AppReducer";

interface SelLocFutProps {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}

const SelectedLocationFuture: FC<SelLocFutProps> = ({
  dispatch,
  state,
}): JSX.Element | null => {
  if (state.futureWeather.length === 0) return null;
  return (
    <div className="future_weather_container">
      <table className="future_weather_table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Cloudiness</th>
            <th>Temperature °C</th>
            <th>Real Humidity</th>
            <th>UV index</th>
            <th>Max. Wind speeds (m/s)</th>
          </tr>
        </thead>
        <tbody>
          {state.futureWeather.map((weathers, index) => {
            return (
              <tr key={index} className="selectedList_cont future_weather">
                <td>{weathers.date}</td>
                <td>{weathers.symbolPhrase}</td>
                <td>{weathers.cloudiness}</td>
                <td>
                  Max: {weathers.maxTemp}, Min: {weathers.minTemp},
                </td>
                <td>
                  Max: {weathers.maxRelHumidity}, Min: {weathers.minRelHumidity}
                </td>
                <td>{weathers.uvIndex}</td>
                <td>{weathers.maxWindSpeed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "showFutureWeather", value: false });
          dispatch({ type: "showLocationList", value: true });
        }}
      >
        Close
      </button>
    </div>
  );
};

export default SelectedLocationFuture;
