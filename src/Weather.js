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
import Linechart from './LineChart.js';
import { Colors } from 'chart.js';
const Weather = () => {

    const [loading,setloading]=useState(false);
    const options = { hour: 'numeric', minute: 'numeric' };
    const currentTime = new Date().toLocaleTimeString([], options);
    const [city, setCity] = useState('Bhimavaram');
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = '7d91ce8b490d7a602ef2ed249a8e79ec';
    const background_images = {
        "Rain": rainy,
        "Clouds":cloudy,
        "Sunny":sunny,
        "Clear":sunny,
        "Haze":cloudy,
        "Snow":cloudy,
    }
    // useEffect( () => {
    //     // Request the user's location
    //     const getlocation = async ()=>{
    //         if (navigator.geolocation) {
    //             navigator.geolocation.getCurrentPosition(
    //               async (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 const newcity = await fetchCityName(latitude, longitude);
    //                 console.log(newcity);
    //                 await fetchWeatherData(newcity);
    //               },
    //               (error) => {
    //                 console.error('Error getting location:', error);
    //                 setloading(false);
    //               }
    //             );
    //           } else {
    //             console.error('Geolocation is not supported by this browser.');
    //             setloading(false);
    //           }
    //     }
    //     getlocation();
    //     fetchWeatherData(city);
    //   }, []);

    // const fetchCityName = async (latitude, longitude) => {
    // try {
    //     // Replace 'YOUR_API_KEY' with your actual API key
    //     const apiKey = 'e3ac11eff514f56ffcfa56094eb130a6';
    //     const response = await axios.get(
    //     `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
    //     );
    //     console.log(response.data);
    //     if (response.data.length > 0) {
    //     setCity(response.data[0].name);
    //     console.log(city)
    //     } else {
    //     setCity('Unknown location');
    //     }
    //     return city;
    // } catch (error) {
    //     console.error('Error fetching city name:', error);
    //     setCity('Unknown location');
    // }
    // };
    const background = weatherData && weatherData.list[0].weather[0].main ? background_images[weatherData.list[0].weather[0].main] : ''
    const color = background===rainy ? 'white' : '';

    const icons = {
        "Rain": rainyicon,
        "Clouds":cloudyicon,
        "Sunny":sunnyicon,
        "Clear":sunnyicon,
        "Haze":cloudyicon,
        "Snow":snowicon,
    }
    const icon = weatherData && weatherData.list[0].weather[0].main ? icons[weatherData.list[0].weather[0].main] : ''
    const fetchWeatherData = async (city) => {
        try {
            setloading(true);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e3ac11eff514f56ffcfa56094eb130a6&units=metric&cnt=50`);
            const data = await response.json();
            if (data.cod === '200') {
                setWeatherData(data);
                console.log(data);

            } else {
                setWeatherData(null);   
                console.log('Error:', data.message);
            }
            setloading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setloading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    useEffect(() => {
        fetchWeatherData(city);
        console.log(window.innerWidth); // Fetch weather data for the default city on component mount
    }, []);

    useEffect(() => {
        if (weatherData && weatherData.city.name) {
            setCity(weatherData.city.name);
        }
    }, [weatherData]);

    return (
        <>  
            <div className='body' style={{ backgroundImage: `url(${background?background:cloudy})` , color : color }}>
            <div className="head"><h1>Weather App</h1></div>
            
            <div className="outer-container">
                <div className="container">
                    <div className="nav">
                        <div className="location-item">
                            <img src={background===rainy ? greypin : pin } alt="Location Pin" id='pin' />
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
                                <img src={background===rainy ? greysearch : search} alt="Search" id='search-icon' />
                            </button>
                        </form>
                    </div>
                    {loading ?
                    <div className='loading-block'><img id="loading" src={loadinggif}/></div>: 
                    weatherData && weatherData.cod === '200' ? (
                            <div className="weather-info">
                                <div className="weather-details">
                                    <div className="temp-block">
                                        <div className="current">
                                            <span>Current Weather</span>
                                            <span>{currentTime}</span>
                                        </div>
                                        <div className="temperature">
                                            <div className='first-block'>
                                                <img src={icon} alt="Cloudy" />
                                                <span className='temp'>{weatherData && weatherData.list[0].main.temp ? Math.round(weatherData.list[0].main.temp)+"°C": '25°C'}</span>
                                            </div>
                                            <div className="inner-temp">
                                                <div>
                                                    <span>{weatherData.list[0].weather[0].main}</span>
                                                    <span className='feels-like'>Feels like {Math.round(weatherData.list[0].main.feels_like)}°C</span>
                                                </div>
                                                <span>The skies will be mostly cloudy. The high will be {Math.round(weatherData.list[0].main.feels_like)}°C on this very humid day.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Parameters  color={Colors} />
                                </div>
                                {/* forecast */}
                                <div>
                                    <Forecastlist weatherData = {weatherData}/>
                                    
                                </div>
                                <div> <Linechart weatherData={weatherData}/></div>
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
