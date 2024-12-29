import './App.css';
import { useEffect, useState } from 'react';
import TopButton from './components/TopButtons';
import Inputs from './components/Inputs';
import getFormattedWeatherData from './services/weatherServices';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureDetails from './components/TemperatureDetails';
import Forecast from './components/Forecast';



function App() {
  const [query, setQuery] = useState({ q: 'kenitra' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        //console.log(weather);
      });
    }
    fetchWeather();
  }, [query, units])


  const formatBackground = () => {
    if (!weather) return ' from-cyan-700 to-blue-700';
    if (weather.temp <= (units === 'metric' ? 20 : 60)) return 'from-cyan-700';
    return 'from-cyan-700 to-blue-700'
  }
  
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButton setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
     {weather && (
      <div>
        <TimeAndLocation weather={weather} />
        <TemperatureDetails weather={weather} />
        <Forecast title="Hourly forecast" items={weather.hourly} />
        <Forecast title="Daily forecast" items={weather.daily} />
      </div>
     )}
    </div>
  );
}

export default App;
