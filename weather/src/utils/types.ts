export interface DataLocationProps {
  adminArea: string;
  country: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  timezone: string;
}

export interface WeatherProps {
  cloudiness: number;
  dewPoint: number;
  feelsLikeTemp: number;
  precipProb: number;
  precipRate: number;
  pressure: number;
  relHumidity: number;
  symbol: string;
  symbolPhrase: string;
  temperature: number;
  thunderProb: number;
  time: string;
  uvIndex: number;
  visibility: number;
  windDir: number;
  windDirString: string;
  windGust: number;
  windSpeed: number;
}

export interface FutureWeatherProps {
  date: string;
  symbol: string;
  symbolPhrase: string;
  maxTemp: number;
  minTemp: number;
  maxFeelsLikeTemp: number;
  minFeelsLikeTemp: number;
  maxRelHumidity: number;
  minRelHumidity: number;
  maxDewPoint: number;
  minDewPoint: number;
  precipAccum: number;
  maxWindSpeed: number;
  windDir: number;
  maxWindGust: number;
  precipProb: number;
  cloudiness: number;
  sunrise: string;
  sunset: string;
  sunriseEpoch: number;
  sunsetEpoch: number;
  moonrise: string;
  moonset: string;
  moonPhase: number;
  uvIndex: number;
  minVisibility: number;
  pressure: number;
}
