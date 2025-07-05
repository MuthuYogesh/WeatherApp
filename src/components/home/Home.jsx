import React,{ useState, useRef } from 'react'
import axios from 'axios'
import style from './Home.module.css'
import CustomButton from '../btn/CustomButton'
import WeatherMap from '../weathermap/WeatherMap'
import location from '../images/location.png'
import wind from '../images/wind.png'
import sun from '../images/sun.png'
import rain from '../images/rain.png'


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export default function Home() {
  const[cty, setCty] = useState("");
  const[weather, setWeather] = useState({});
  const[sunRise, setSunRise] = useState();
  const[sunSet, setSunSet] = useState();
  const[img, setImg] = useState();
  const[error, setError] = useState("");
  const cityRef = useRef();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    let city = cityRef.current.value.trim();

    if(!isValid(city)){
        setError("City is invalid");
        return;
    }
    let data = await getData(city);
    console.log("data", data);
  }

  const isValid = (city)=>{
    let match = /^[a-zA-Z][a-zA-Z\s-]*[a-zA-Z]$/.test(city);
    return match;
  }

  const getData = async (city)=>{
    try{
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params:{
                q:`${city}`,
                appid:API_KEY
            }
        });
        setCty(city);
        setWeather(response.data);
        setImg(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        let t = new Date(response.data.sys.sunrise);
        setSunRise(t.toUTCString());
        t = new Date(response.data.sys.sunset);
        setSunSet(t.toUTCString());
        setError('');
        return response.data;
    }
    catch(err){
        setWeather(null);
        setCty('');
        console.log("catch block")
        if(err.response && err.response.status === 404){
            setError("City Not Found, Enter a Valid City");
        }
        else{
            setError("Error occured visit again");
        }
    }
  }

  return (
    <>  
        <div className={style.searchField}>
            {error&&<p className={style.err}>{error}</p>}
            <input type='text' placeholder='Enter city here' ref={cityRef}></input>
            <CustomButton btnText='search' customStyle={style.customStyle} handleClick={(e)=>handleSubmit(e)}/>
        </div>
    
        <div className={style.groups}>
            {(weather?.main || (weather?.weather && weather.weather.length > 0)) && (
            <div className={style.group1}>
                <div className={style.group1Img}>
                    <img className={style.logo} src={location} alt='logo'></img>
                    <img className={style.condition} src={img} alt=''></img> 
                </div>
                <h3>{cty}</h3>
                <p>Temperature: {weather?.main?.temp}</p>
                <p>Humidity: {weather?.main?.humidity}</p>
                <p>Condition: {weather?.weather[0]?.description} </p>   
            </div>
            )}

            {weather?.wind && (
                <div className={style.group2}>
                    <img className={style.logo} src={wind} alt='logo'></img>
                    <h3>Wind</h3>
                    <p>Speed: {weather?.wind?.speed}</p>
                    <p>Degree: {weather?.wind?.deg}</p>
                    <p>Gust: {weather?.wind?.gust}</p>
                    {weather?.rain&&<>
                        <img className={style.logo} src={rain} alt='logo'></img>
                        <h3>Rain</h3>
                        <p>Rainfall: {weather?.rain}</p>
                    </>}
                </div>
            )}

            {weather?.sys && (
                <div className={style.group3}>
                    <img className={style.logo} src={sun} alt='logo'></img>
                    <h3>Sunrise & Sunset</h3>
                    <p>Sunrise: {sunRise}</p>
                    <p>Sunrise: {sunSet}</p>                
                </div>
            )}

            {weather?.coord &&
                <div className={style.group4}>
                    <WeatherMap lat={weather?.coord?.lat} lon={weather?.coord?.lon}></WeatherMap>
                </div>
            }
        </div>
    </>
  )
}
