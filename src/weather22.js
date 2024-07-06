import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css';
import pin from './assets/icons/pin.png';
import search from "./assets/icons/search.png";
import cloudyicon from './assets/icons/cloudy.png';
import rainyicon from './assets/icons/rainy-day.png'
import sunnyicon from "./assets/icons/sun.png"
import snowicon from "./assets/icons/snow.png"
import Forecastlist from './Forecastlist.js';
import Parameters from './Parameters.js';
import rainy from './assets/rainy.jpg'
import cloudy from "./assets/cloudy.jpg"
import sunny from './assets/sunny.jpg'
import greypin from './assets/icons/greypin.png'
import greysearch from './assets/icons/greysearch.png'
import loadinggif from "./assets/loading.gif"

const Weather = () => {
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState('Bhimavaram');
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

    const background_images = {
        "Rain": rainy,
        "Clouds": cloudy,
        "Sunny": sunny,
        "Clear": sunny,
        "Haze": cloudy,
        "Snow": cloudy,
    };

    const icons = {
        "Rain": rainyicon,
        "Clouds": cloudyicon,
        "Sunny": sunnyicon,
        "Clear": sunnyicon,
        "Haze": cloudyicon,
        "Snow": snowicon,
    };

    const fetchCityName = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
            );
            if (response.data.length > 0) {
                return response.data[0].name;
            } else {
                return 'Unknown location';
            }
        } catch (error) {
            console.error('Error fetching city name:', error);
            return 'Unknown location';
        }
    };

    const fetchWeatherData = async (city) => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&cnt=50`
            );
            const data = await response.json();
            if (data.cod === '200') {
                setWeatherData(data);
            } else {
                setWeatherData(null);
                console.log('Error:', data.message);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const getLocationAndWeather = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const newCity = await fetchCityName(latitude, longitude);
                        setCity(newCity);
                        fetchWeatherData(newCity);
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        fetchWeatherData(city); // Fallback to default city if location permission is denied
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                fetchWeatherData(city); // Fallback to default city if geolocation is not supported
            }
        };

        getLocationAndWeather();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const background = weatherData && weatherData.list[0].weather[0].main ? background_images[weatherData.list[0].weather[0].main] : cloudy;
    const color = background === rainy ? 'white' : '';

    const icon = weatherData && weatherData.list[0].weather[0].main ? icons[weatherData.list[0].weather[0].main] : '';

    return (
        <>
            <div className='body' style={{ backgroundImage: `url(${background})`, color: color }}>
                <div className="head"><h1>Weather App</h1></div>

                <div className="outer-container">
                    <div className="container">
                        <div className="nav">
                            <div className="location-item">
                                <img src={background === rainy ? greypin : pin} alt="Location Pin" id='pin' />
                                <div className="location">{city}</div>
                            </div>
                            <form className="search-bar" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={city}
                                    onChange={handleInputChange}
                                />
                                <button type="submit">
                                    <img src={background === rainy ? greysearch : search} alt="Search" id='search-icon' />
                                </button>
                            </form>
                        </div>
                        {loading ?
                            <div className='loading-block'><img id="loading" src={loadinggif} alt="Loading" /></div> :
                            weatherData && weatherData.cod === '200' ? (
                                <div className="weather-info">
                                    <div className="weather-details">
                                        <div className="temp-block">
                                            <div className="current">
                                                <span>Current Weather</span>
                                                <span>{new Date().toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</span>
                                            </div>
                                            <div className="temperature">
                                                <div className='first-block'>
                                                    <img src={icon} alt="Weather Icon" />
                                                    <span className='temp'>{Math.round(weatherData.list[0].main.temp)}°C</span>
                                                </div>
                                                <div className="inner-temp">
                                                    <div>
                                                        <span>{weatherData.list[0].weather[0].main}</span>
                                                        <span className='feels-like'>Feels like {Math.round(weatherData.list[0].main.feels_like)}°C</span>
                                                    </div>
                                                    <span>The skies will be mostly {weatherData.list[0].weather[0].main.toLowerCase()}. The high will be {Math.round(weatherData.list[0].main.temp_max)}°C.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Parameters />
                                    </div>
                                    <Forecastlist weatherData={weatherData} />
                                </div>
                            ) : (
                                <p className='notfound'>Data not found😢😢</p>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Weather;
