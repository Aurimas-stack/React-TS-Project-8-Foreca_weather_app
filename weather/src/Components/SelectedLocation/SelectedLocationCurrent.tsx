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
    <div className="selectedList_cont">
      <ul className="current_weather">
        {Object.entries(state.currentWeather[0]).map(([key, value], index) => {
          return (
            <li key={index}>
              <span className="description">{key}:</span> {value}
            </li>
          );
        })}
      </ul>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "showCurrentWeather", value: false });
          dispatch({ type: "showLocationList", value: true });
        }}
      >
        Close
      </button>
    </div>
  );
};

export default SelectedLocationCurrent;
