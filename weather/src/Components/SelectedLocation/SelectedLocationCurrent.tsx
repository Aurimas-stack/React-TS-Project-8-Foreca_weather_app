import { FC } from "react";

import { Action, InitialState } from "../App/Reducer/AppReducer";

interface SelectedLocationProps {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}

const SelectedLocationCurrent: FC<SelectedLocationProps> = ({
  state,
  dispatch,
}): JSX.Element | null => {
  if (state.currentWeather.length === 0) return null;

  return (
    <ul className="selectedList_cont current_weather">
      <li>{state.currentWeather[0].temperature} Celsius</li>
      <li>cloudiness: {state.currentWeather[0].cloudiness},</li>
      <li>humidity: {state.currentWeather[0].relHumidity},</li>
      <li>windSpeed: {state.currentWeather[0].windSpeed} m/s,</li>
      <li>UV index: {state.currentWeather[0].uvIndex}</li>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "showCurrentWeather", value: false });
          dispatch({ type: "showLocationList", value: true });
        }}
      >Close
      </button>
    </ul>
  );
};

export default SelectedLocationCurrent;
