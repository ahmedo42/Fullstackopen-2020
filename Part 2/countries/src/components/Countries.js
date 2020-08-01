import React from 'react'
import Weather from './Weather'
const Country = (props) =>{
    if(props.showAll){
        return(
            <div>
            <span>{props.country.name} </span>
            <button onClick = {props.clickHandler} title = {props.country.name}>show</button>
            </div>
            )
    }
    else{
        return (
            <div>
            <h1>{props.country.name}</h1>
            <p>capital {props.country.capital}</p>
            <p>population {props.country.population}</p>
            <h2>Languages</h2>
            <ul>
            {props.country.languages.map(language => <li>{language.name}</li>)}
            </ul>
            <img src = {props.country.flag} alt = "" width="40" height="50"></img>
            <Weather weather = {props.weather} capital = {props.country.capital}/>
            </div>
        )
    }
}
const Countries = (props) => {
    if(props.countries.length > 10){
        return <b>too many results</b>
    }
    return (
        <div>
            {props.countries.map(country =>
               <Country country = {country} clickHandler = {props.handleClick} showAll = {props.showAll} weather ={props.weather}/>
            )}
        </div>
    )
}
export default Countries