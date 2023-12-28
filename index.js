const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios")
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/", async(req, res) => {
    const city = req.body.cityName
    const apiKey = "28aacd7b3fe5e945777dddfadb6f3822"
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+apiKey+"&units=metric"
    try {
        const response = await axios.get(url)
        const temp = response.data.main.temp
        const feelsLike = response.data.main.feels_like
        const description = response.data.weather[0].description
        const icon = response.data.weather[0].icon
        const iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.render("index.ejs", {
            temp: temp,
            feelsLike: feelsLike,
            des: description,
            iconUrl: iconUrl
        })
    } catch (error) {
        res.send(error.message)
    }
})


app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
