require('dotenv').config();
const express = require('express');
const request = require('superagent');
// const data = require('./data/geo.js');
// const weather = require('./darksky.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.get('/', (req, res) => res.send('Jello World!'));

let lat;
let lng;

app.get('/location', async(req, res, next) => {
    try { const location = req.query.search;

    const URL = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${location}&format=json`;    
    
    const cityData = await request.get(URL);

    const firstResult = cityData.body[0];

    lat = firstResult.lat;
    lng = firstResult.lng;

    res.json({
        formatted_query: cityData.formatted_address,
        latitude: lat,
        longitude: lng,
    });
} catch(err) {
    next(err);
}
});
const getWeatherData = async (lat, lng) => {
    const weather = await request.get(`
    https://api.darksky.net/forecast/${WEATHER_KEY}/${lat},${long}`);
    
    
    return weather.body.daily.data.map(forecast => {
        return {
        forecast: forecast.summary,
        time: new Date(forecast.time * 1000),
    };
    });
};
        
        app.get('/weather', (req, res, next) => {
    const portlandWeather = getWeatherData(lat, lng);
            res.json(portlandWeather);
});
app.get('*', (req, res) => res.send('404!!!'))
module.exports = {
    app: app,

};
//need to remove app.listen when the tests are running 
