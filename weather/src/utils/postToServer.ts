import { WeatherProps } from "./types";

export const postLocation = (item: string) => {
  fetch("/api", {
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

export const postCurrentWeather = (
  name: string | undefined,
  weather: WeatherProps
) => {
  fetch("/api/current", {
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
