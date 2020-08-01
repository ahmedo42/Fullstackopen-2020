import React from 'react'

const Weather = (props) =>{
    return (
        <div>
        <h2>Weather in {props.capital}</h2>
        <b>temperature : </b> <span>{props.weather.temperature} celsius </span>
        <img src = {props.weather.weather_icons} alt = "" width="40" height="50"></img>
        <br></br>
        <b>wind : </b> <span>{props.weather.wind_speed} km/h direction {props.weather.wind_dir} </span>
        </div>
    )
}
export default Weather;