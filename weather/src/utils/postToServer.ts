import { WeatherProps } from "./types";

export const postSearchedLocation = async(item: string) => {
  await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ location: item, date: new Date() }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => console.log(error));
};

export const postSearchedCurrentWeather = async(
  name: string | undefined,
  weather: WeatherProps
) => {
  await fetch("/api/current", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      currentWeather: weather,
      date: new Date(),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })
    .catch((error) => console.log(error));
};
