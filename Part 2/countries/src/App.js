import React , {useState , useEffect} from 'react';
import Countries from './components/Countries'
import SearchForm from './components/SearchForm'
import axios from 'axios'
import './App.css';


const App = () =>{
    const hook = () => {
        axios
          .get('https://restcountries.eu/rest/v2/all?fields=name;capital;languages;population;flag')
          .then(response => {
              setData(response.data);
          })
      }
    useEffect(hook,[]);
    const [searchTerm , setSearchTerm] = useState('');
    const [data , setData] = useState([]);
    const [showAll , setShowAll] = useState(true)
    const [display , setDisplay] = useState([]);
    const [weather , setWeather] = useState({});

    const getResults = (event) => {
        event.preventDefault()
        const results = data.filter(dataPoint =>
            dataPoint.name.toLowerCase().includes(searchTerm)
        );
        if(results.length <= 10){
            setShowAll(true);
        }
        else if(results.length === 1){
            setShowAll(false);
        }
        setDisplay(results);
    }

    const handleClick = (event) =>{
        setShowAll(!showAll);
        setDisplay(display.filter(country => country.name === event.target.title))
        const api_key = process.env.REACT_APP_API_KEY;
        const promise = axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${event.target.title}`);
        promise.then(response =>{
            setWeather(response.data.current);
        });
    }

    const handleSearch = (event) =>{
        setSearchTerm(event.target.value);
    }
    return (
        <div>
        <SearchForm results = {getResults}  search = {handleSearch} term = {searchTerm}/>
        <Countries countries = {display} handleClick = {handleClick} showAll = {showAll} weather = {weather} />
        </div>
    ) 
}

export default App;
