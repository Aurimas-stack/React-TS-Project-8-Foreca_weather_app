import { FC } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Action, InitialState } from "../App/Reducer/AppReducer";

interface SelLocFutProps {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
}

const SelectedLocationFuture: FC<SelLocFutProps> = ({
  dispatch,
  state,
}): JSX.Element | null => {
  if (state.futureWeather.length === 0) return null;
  return (
    <div className="future_weather_container">
      <TableContainer component={Paper} className="future_weather_table">
        <Table sx={{ maxWidth: 950 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Description
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Cloudiness
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Temperature °C
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Real Humidity
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                UV index
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Max. Wind speeds (m/s)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.futureWeather.map((weathers, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {weathers.date}
                </TableCell>
                <TableCell align="center">{weathers.symbolPhrase}</TableCell>
                <TableCell align="center">{weathers.cloudiness}</TableCell>
                <TableCell align="center">
                  Max: {weathers.maxTemp}, Min: {weathers.minTemp},
                </TableCell>
                <TableCell align="center">
                  Max: {weathers.maxRelHumidity}, Min: {weathers.minRelHumidity}
                </TableCell>
                <TableCell align="center">{weathers.uvIndex}</TableCell>
                <TableCell align="center">{weathers.maxWindSpeed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "showFutureWeather", value: false });
          dispatch({ type: "showLocationList", value: true });
        }}
      >
        Close
      </button>
    </div>
  );
};

export default SelectedLocationFuture;
