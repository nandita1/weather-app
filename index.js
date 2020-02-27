const express = require("express");
const app = express();
const axios = require("axios");
let jsonData = require("./icons.json");

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

var port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.render("index.ejs", { search: false });
});

app.post("/", (req, res) => {
  console.log(req.body.city);
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=ea04fb6ca3f007ce3dc95d1f5eb686d5`
    )
    .then(result => {
      //console.log(jsonData[result.data.weather[0].id]);
      var temp = Math.round(result.data.main.temp - 273);
      var cityName = result.data.name;
      var description = result.data.weather[0].description;
      var prefix = "wi wi-";
      var code = result.data.weather[0].id;
      var icon = jsonData[result.data.weather[0].id].icon;
      var today = new Date();
      var date = String(today.getDate());
      var month = today.toLocaleString("default", { month: "short" });
      //console.log(today);
      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = "day-" + icon;
      }
      // Finally tack on the prefix.
      icon = prefix + icon;

      //console.log(temp, cityName, description, icon, month);
      res.render("index.ejs", {
        search: true,
        temp,
        cityName,
        description,
        icon,
        date,
        month
      });
    });
});

app.listen(port, () => {
  console.log("listening to port ", port);
});
