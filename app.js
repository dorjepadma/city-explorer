const express = require('express');
// const req = require('superagent');
const data = require('./data/geo.js');
const weather = require('./data/darksky.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/', (req, res) => res.send('Jello World!'));

let lat;
let lng;
app.get('/location', (req, res, next) => {
    try { const location = req.query.search;

    const cityData = data.results[0];

    lat = cityData.geometry.location.lat;
    lng = cityData.geometry.location.lng;

    res.json({
        formatted_query: cityData.formatted_address,
        latitude: cityData.geometry.location.lat,
        longitude: cityData.geometry.location.lng,
    });
} catch(err) {
    next(err);
}
});
const getWeatherData = (lat, lng) => {
    return weather.daily.data.map(forecast => {
        return {
        forecast: forecast.summary,
        time: new Date(forecast.time * 1000),
    };
    })
};
        
        app.get('/weather', (req, res) => {
    const portlandWeather = getWeatherData(lat, lng);
            res.json(portlandWeather);
});
app.get('*', (req, res) => res.send('404!!!'))
module.exports = {
    app: app,

};
//need to remove app.listen when the tests are running 
