import React from 'react';

const Parameters = (props) => {
    const { weatherData, color } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatParameter = (label, value, unit = '') => {
        return (
            <div className="parameter">
                <span>{label}: </span>
                <span style={{ color }}>{value}{unit}</span>
            </div>
        );
    };

    if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
        return <p>No weather data available</p>;
    }

    const { main, wind, visibility } = weatherData.list[0];
    const { pressure, sea_level, grnd_level, humidity } = main;

    return (
        <div className="weather-parameters">
            <h2 className="parameters-heading">Additional Parameters</h2>
            <div className="parameters-block">
                <div className="parameter1">
                    {formatParameter('Pressure', pressure, ' mb')}
                    {formatParameter('Sea Level', sea_level, ' mb')}
                    {formatParameter('Ground Level', grnd_level, ' mb')}
                    
                </div>
                <div className="parameter2">
                    {formatParameter('Humidity', humidity, '%')}
                    {formatParameter('Wind Speed', wind.speed, ' km/h')}
                    {formatParameter('Visibility', visibility / 1000, ' km')}
                </div>
            </div>
        </div>
    );
};

export default Parameters;
