import './App.css';
import { useEffect, useState } from 'react';
import TopButton from './components/TopButtons';

function App() {
  const [query, setQuery] = useState({ q: 'tokyo' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  
  const formatBackground = () => {
    if (!weather) return ' from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return 'from-cyan-700';
    return 'from-cyan-700 to-blue-700'
  }
  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButton setQuery={setQuery} />
     
    </div>
  );
}

export default App;
