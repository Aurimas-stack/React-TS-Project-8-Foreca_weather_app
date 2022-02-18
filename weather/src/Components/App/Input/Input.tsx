import React, { FC } from "react";

import { Action, InitialState } from "../Reducer/AppReducer";

import ErrorBlock from "../ErrorBlock/ErrorBlock";

interface InputProps {
  dispatch: React.Dispatch<Action>;
  state: InitialState;
  onLocation: (e: React.FormEvent) => Promise<void>;
}

const Input: FC<InputProps> = ({ onLocation, state, dispatch }) => {
  return (
    <form className="input_cont" onSubmit={onLocation}>
      <input
        type="text"
        className="main_input"
        value={state.searchLocation}
        placeholder="Type in your wanted location..."
        maxLength={30}
        onChange={(e) =>
          dispatch({ type: "searchLocation", value: e.target.value })
        }
        required
      />
      <ErrorBlock word={state.error} />
      <button className="btn" type="submit">
        Get location
      </button>
    </form>
  );
};

export default Input;
