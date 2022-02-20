const mainUrl: string = "https://foreca-weather.p.rapidapi.com/";
const apiKey: string = ""; //API KEY GOES HERE

export const locationFetch = (search: string): Promise<Response> => {
  const response: Promise<Response> = fetch(
    `${mainUrl}location/search/${search.toLocaleLowerCase()}?`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    }
  );

  return response;
};

export const weatherFetch = (
  id: number,
  weatherType: string
): Promise<Response> => {
  const currentUrl = `${mainUrl}current/${id}?alt=0&tempunit=C&windunit=MS&tz=Europe`;
  const futureUrl = `${mainUrl}forecast/daily/${id}?alt=0&tempunit=C&windunit=MS&periods=8&dataset=full`;
  const url = weatherType === "current" ? currentUrl : futureUrl;

  const response: Promise<Response> = fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "foreca-weather.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
  });

  return response;
};
