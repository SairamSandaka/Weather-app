const Parameters = ({ color }) => {
    return (
        <div className="weather-parameters">
            <h2 className="parameters-heading">Additional Parameters</h2>
            <div className="parameters-block">
                <div className="parameter1">
                    <div className="parameter">
                        <span>Air Quality: </span>
                        <span style={{ color }}>109</span>
                    </div>
                    <div className="parameter">
                        <span>Wind: </span>
                        <span style={{ color }}>7 km/h</span>
                    </div>
                    <div className="parameter">
                        <span>Humidity: </span>
                        <span style={{ color }}>84%</span>
                    </div>
                </div>
                <div className="parameter2">
                    <div className="parameter">
                        <span>Visibility: </span>
                        <span style={{ color }}>2.7 km</span>
                    </div>
                    <div className="parameter">
                        <span>Pressure: </span>
                        <span style={{ color }}>997 mb</span>
                    </div>
                    <div className="parameter">
                        <span>Dew Point: </span>
                        <span style={{ color }}>27°</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parameters;
