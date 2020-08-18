import {useState , useEffect} from 'react'
import axios from 'axios'

const useCountry = (name) => {
    const [country, setCountry] = useState(null);
  
    useEffect(() => {
        const fetchCountry = async () => {
            console.log(name)
            const url =  `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
            try {
                const response = await axios.get(url)
                setCountry(response.data[0])

            } catch(error){
                setCountry(error.response.data);
                console.log("err.response.data", error.response.data);
            }
        }
        if (name) {
            fetchCountry();
          }
        }, [name]);
    return country
  }

export default useCountry