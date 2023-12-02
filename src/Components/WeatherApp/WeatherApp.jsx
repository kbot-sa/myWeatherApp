import React, { useState } from 'react'
import './WeatherApp.css'
{/*All Images used for weather icons*/}
import clear_icon from '../../Assets/clear.png'
import cloud_icon from '../../Assets/cloud.png'
import drizzle_icon from '../../Assets/drizzle.png'
import rain_icon from '../../Assets/rain.png'
import snow_icon from '../../Assets/snow.png'
import wind_icon from '../../Assets/wind.png'
import humidity_icon from '../../Assets/humidity.png'


const WeatherApp = () => {


    const api_key = '242352b4c62863a49dc15f75334daabe'; 
    const [wicon, setWicon] = useState(cloud_icon);

    {/*Search function that fetches data from 'Open Weather Map' API and return info */}
    const search = async () => {
        const element = document.getElementsByClassName('cityInput');
        
        if (element[0].value === '') {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch (url); 
        let data = await response.json();

        {/*Catch in case invalid city name is entered */}
        if (data.message === "city not found") {
            alert("City Not Found!")
        }

        const humidity = document.getElementsByClassName('humidity-percentage');
        const wind = document.getElementsByClassName('wind-speed');
        const temperature = document.getElementsByClassName('weather-temp');
        const location  = document.getElementsByClassName('weather-location');

        humidity[0].innerHTML = data.main.humidity + '%';
        wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
        temperature[0].innerHTML = Math.floor(data.main.temp) + '°C';
        location[0].innerHTML = data.name;

        {/*If statements to set the icon depending on weather data, should be refactored to switch satement & include more icons */}
        if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n' ) {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n' ) {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n' ) {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n' ) {
            setWicon(clear_icon);
        } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n' ) {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === '010d' || data.weather[0].icon === '010n' ) {
            setWicon(rain_icon);
        } else if (data.weather[0].icon === '013d' || data.weather[0].icon === '013n' ) {
            setWicon(snow_icon);
        } else {
            setWicon(clear_icon);
        }
        
    }

    return (
        <div className='container'>
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder='Search' />
                <div className="search-icon" onClick={() => {search()}}>
                    <i className="fa fa-search"></i>
                </div>
            </div>

            <div className="weather-image">
                <img src={wicon} alt="weather-image-icon" />
            </div>

            <div className="weather-temp">21°C</div>
            <div className="weather-location">Cape Town</div>
            <div className="data-container">

                <div className="element">
                     <img src={humidity_icon} alt="" className="icon" />
                     <div className="data">
                        <div className="humidity-percentage">64%</div>
                        <div className="text">Humidity</div>
                     </div>
                </div>
                <div className="element">
                     <img src={wind_icon} alt="" className="icon" />
                     <div className="data">
                        <div className="wind-speed">18 km/h</div>
                        <div className="text">Wind Speed</div>
                     </div>
                </div>

            </div>
        </div>
    )
}

export default WeatherApp