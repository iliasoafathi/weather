import { DateTime } from "luxon";
const API_KEY = "3fc62ef15fdfb1a7f994d04c0b18b63b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  {/* hna kandwdzo URL dyali dyal API + medina INFOTYPE, moraha API KEY w SEARCHPARAMS (wach mdina wla lon lat)*/}
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
    return fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  };

//had katformi data li mkhrbqa 
  const formatCurrentWeather = (data) => {
    const {
      coord: { lat, lon },
      main: { temp, feels_like, temp_min, temp_max, humidity },
      name,
      dt,
      sys: { country, sunrise, sunset },
      weather,
      wind: { speed },
    } = data;
  
    const { main: details, icon } = weather[0];//array
  
    return {
      lat,
      lon,
      temp,
      feels_like,
      temp_min,
      temp_max,
      humidity,
      name,
      dt,
      details,
      icon,
      country,
      sunrise,
      sunset,
      speed,
    };
  };

  const formatForecastWeather = (data) => {
    //console.log(data);
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "ccc"),
        temp: d.temp.day,
        icon: d.weather[0].icon,
      };
    });
    hourly = hourly.slice(1, 6).map((d) => {
      return {
        title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
        temp: d.temp,
        icon: d.weather[0].icon,
      };
    });
  
    return { timezone, daily, hourly };
  };

  //hadi hiya awel methode tatlanca
  const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather); //hna eaytnalha bach tqad data 
  
    const { lat, lon } = formattedCurrentWeather;
  
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current, minutely, alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
  
    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  };
//hado bach t afficher lwaqt ela hsab lfomra li bghiti
  const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
  
//kan3tiwh l code ohuwa ay3tina icon dyal dak taqs
  const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

  export default getFormattedWeatherData;
  
  export { formatToLocalTime, iconUrlFromCode };