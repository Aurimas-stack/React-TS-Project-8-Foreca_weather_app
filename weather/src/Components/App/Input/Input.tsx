import { FC, useState } from "react";

import ErrorBlock from "../ErrorBlock/ErrorBlock";

interface InputProps {
    error: string;
    searchLocation: string;
    setError: (e: string) => void;
    setSearchLocation: (e: string) => void;
    onLocation: () => Promise<void>;
}

const Input: FC<InputProps> = ({error, searchLocation, setSearchLocation, onLocation}) => {

  const handleLocations = () => {};
  return (
    <div>
      <input
        type="text"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        required
      />
      <ErrorBlock word={error} />
      <button onClick={onLocation}>Get locations</button>
    </div>
  );
};

export default Input;
