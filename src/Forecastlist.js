import Forecastblock from "./Forecast.js"
import "./Forecastlist.css"
const Forecastlist = (props)=>{
    let forecastItems =[]
    for (let i = 0; i < props.weatherData.list.length; i += 8) {
        forecastItems.push(
            <Forecastblock key={i} weatherData={ props.weatherData}  i = {i}/>
        );
    }
    if(props.weatherData){
        var dt = props.weatherData.list[39].dt  + 86400;
        console.log(dt);
    }
    
    for (let i = 0; i < 2; i += 1) {
        forecastItems.push(
            <Forecastblock key={i} weatherData={ props.weatherData}  i = {i} dt = {dt}/>
            
        );
        dt+=86400;
    }
    
    return(
            <div className="list-items">
            {forecastItems}
            </div>
    )
}
export default Forecastlist;