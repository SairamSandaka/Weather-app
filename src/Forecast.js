import React from 'react';
import "./Forecast.css";
import cloudyicon from './assets/icons/cloudy.png';
import rainyicon from './assets/icons/rainy-day.png';
import sunnyicon from "./assets/icons/sun.png";

const Forecastblock = (props) => {
    const { weatherData, i } = props;
    const timestamp = weatherData.list[i].dt;
    const date = new Date(timestamp * 1000);
    const day = date.getDay();
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dayName = daysOfWeek[day];
    const icons = {
        "Rain": rainyicon,
        "Clouds": cloudyicon,
        "Sunny": sunnyicon
    };

    let icon = sunnyicon;

    if (weatherData && weatherData.list && weatherData.list[i] && weatherData.list[i].weather && weatherData.list[i].weather[0]) {
        const mainWeather = weatherData.list[i].weather[0].main;
        icon = icons[mainWeather] || sunnyicon;
    }
    if(props.dt){
        const tstamp = props.dt;
        const dat = new Date(tstamp * 1000);
        const dy = dat.getDay();
        const dyName = daysOfWeek[dy];
        return(
            <div className="forecast-block">
            <div className="day">{dyName}</div>
            <div className="items">
                <img src={icon} className='forecast-img' alt="Weather Icon" />
                <div className="temps">
                    <h2 className='fore-temp'>{weatherData && weatherData.list && weatherData.list[i] && weatherData.list[i].main && Math.round(weatherData.list[i].main.temp) + "°C"}</h2>
                    <h2 className='fore-temp'>{weatherData && weatherData.list && weatherData.list[i] && weatherData.list[i].main && Math.round(weatherData.list[i].main.feels_like) + "°C"}</h2>
                </div>
            </div>
        </div>
        )
    }
    return (
        <div className="forecast-block">
            <div className="day">{dayName}</div>
            <div className="items">
                <img src={icon} className='forecast-img' alt="Weather Icon" />
                <div className="temps">
                    <h2 className='fore-temp'>{weatherData && weatherData.list && weatherData.list[i] && weatherData.list[i].main && Math.round(weatherData.list[i].main.temp) + "°C"}</h2>
                    <h2 className='fore-temp'>{weatherData && weatherData.list && weatherData.list[i] && weatherData.list[i].main && Math.round(weatherData.list[i].main.feels_like) + "°C"}</h2>
                </div>
            </div>
        </div>
    );
};

export default Forecastblock;
