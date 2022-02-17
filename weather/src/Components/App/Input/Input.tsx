import React, { FC, useState } from "react";

import ErrorBlock from "../ErrorBlock/ErrorBlock";

import "./Input.scss";

interface InputProps {
  error: string;
  searchLocation: string;
  setError: (e: string) => void;
  setSearchLocation: (e: string) => void;
  onLocation: (e: React.FormEvent) => Promise<void>;
}

const Input: FC<InputProps> = ({
  error,
  searchLocation,
  setSearchLocation,
  onLocation,
}) => {
  return (
    <form className="input_cont" onSubmit={onLocation}>
      <input
        type="text"
        className="main_input"
        value={searchLocation}
        placeholder="Type in your wanted location..."
        maxLength={30}
        onChange={(e) => setSearchLocation(e.target.value)}
        required
      />
      <ErrorBlock word={error} />
      <button className="btn" type="submit">Get locations</button>
    </form >
  );
};

export default Input;
