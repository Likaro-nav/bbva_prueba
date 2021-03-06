import {useState} from 'react';
import axios from 'axios';

import {BASE_URL, units, lang, API_KEY} from '../api/api'
import getCurrentDay from '../utils/getCurrentDay'
import getDetailedForecast from '../utils/getDetailedForecat';


const useWeather = () => {
    const [newError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    //Llamada a la API
    const request = async city => {
        const {data} = await axios(`${BASE_URL}?q=${city}&units=${units}&lang=${lang}&appid=${API_KEY}`);
        setError(false);
        collectForecastData(data);
    }

    const submitRequest = async city => {
        setLoading(true);
        await request(city);
     }

     const collectForecastData = async data => {
        const dayForecast =  getCurrentDay(data, data.name, data.main);
        const dayDetails = getDetailedForecast(data);
        setForecast({dayForecast, dayDetails});
     }


    return {
        newError,
        isLoading,
        forecast,
        submitRequest,
    }
}

export default useWeather;