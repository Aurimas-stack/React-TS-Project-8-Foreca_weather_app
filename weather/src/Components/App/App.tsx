import { useEffect, useState } from "react";

import Input from "./Input/Input";
import LocationList from "../LocationList/LocationList";
import SelectedLocationCurrent from "../SelectedLocation/SelectedLocationCurrent";
import SelectedLocationFuture from "../SelectedLocation/SelectedLocationFuture";

import { apiKey } from "../../utils/Api";
import {
  DataLocationProps,
  WeatherProps,
  FutureWeatherProps,
} from "../../utils/types";



function App() {
  const [error, setError] = useState<string>("");
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataLocationProps[]>([]);
  const [weatherType, setWeatherType] = useState<string>("");
  const [weather, setWeather] = useState<WeatherProps>();
  const [futureWeather, setFutureWeather] = useState<FutureWeatherProps[]>();

  const handleLocation = async (): Promise<void> => {
    try {
      const response: Response = await fetch(
        `https://foreca-weather.p.rapidapi.com/location/search/${searchLocation}?`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
          },
        }
      );
      const data = await response.json();
      setData(data.locations);
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleLocationWeather = async (
    id: number,
    urlType: string
  ): Promise<void> => {
    const currentUrl = `https://foreca-weather.p.rapidapi.com/current/${id}?alt=0&tempunit=C&windunit=MS&tz=Europe`;
    const futureUrl = `https://foreca-weather.p.rapidapi.com/forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
    const url = urlType === "current" ? currentUrl : futureUrl;

    try {
      const response: Response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      });
      const data = await response.json();
      weatherType === "current"
        ? setWeather(data.current)
        : setFutureWeather(data.forecast);
    } catch (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="App">
      <Input
        error={error}
        searchLocation={searchLocation}
        setError={setError}
        setSearchLocation={setSearchLocation}
        onLocation={handleLocation}
      />
      {data.length > 0 && (
        <LocationList
          data={data}
          onLocationWeather={handleLocationWeather}
          setWeatherType={setWeatherType}
        />
      )}
      {weather !== undefined && weatherType === "current" && (
        <SelectedLocationCurrent weather={weather} />
      )}
      {futureWeather !== undefined && weatherType === "future" && (
        <SelectedLocationFuture futureWeather={futureWeather} />
      )}
    </div>
  );
}

export default App;
