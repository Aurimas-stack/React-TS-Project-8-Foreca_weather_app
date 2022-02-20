const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extented: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  console.log({ "Searched location": req.body.location, date: req.body.date });
});

app.post("/api/current", (req, res) => {
  if (!req.body) return res.sendStatus(400);

  console.log({
    name: req.body.name,
    weather: req.body.currentWeather,
    date: req.body.date,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
