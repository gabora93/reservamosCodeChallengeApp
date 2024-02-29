import {  useState } from 'react';
import './App.css';
import { searchCities } from './api/reservarmosService';
import { fetchWeather } from './api/weatherService';
import { CityOption, WeatherData } from './types';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  const handleSearch = async () => {
    const cities = await searchCities(cityInput);
    setCityOptions(cities);
  };

  const addCityWeather = async (city: CityOption) => {
    const coords = { latitude: city.lat!, longitude: city.long! };
    const weather = await fetchWeather(coords);
    setWeatherData([...weatherData, { city: city.city_name, data: weather }]);
    setCityOptions([]); 
    setCityInput(''); 
  };

  const removeCity = (cityName: String) => {
    setWeatherData(weatherData.filter(cityWeather => cityWeather.city !== cityName));
  };

  return (
    <div className="relative">
      <div className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-gray-200 rounded">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-2 space-x-4">
         
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name"
                className="p-2 border rounded"
              />
              <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded">Search City</button>
              
          </div>
        </div>
        {cityOptions.length > 0 && (
                <ul className="mt-4">
                  {cityOptions.map((city, index) => (
                    <li key={index} onClick={() => addCityWeather(city)} className="cursor-pointer hover:bg-gray-200 p-2">
                      {city.city_name}, {city.state} - {city.country}
                    </li>
                  ))}
                </ul>
              )}
      </div>

      <div className="min-h-full mt-8">
        {weatherData.map((cityWeather, index) => (
          <div key={index} className="max-w-md mx-auto mb-6 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 text-center text-black">{cityWeather.city}</h2>
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                <div className="flex flex-row justify-between md:justify-start ">
                  {cityWeather.data?.slice(0, 7).map((day, idx) => (
                    <div key={idx} className="md:mb-1 last:mb-0">
                      <p className="text-xs font-medium text-black">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                      <p className="text-sm text-black">Max: {day.temp.max.toFixed(1)}°C</p>
                      <p className="text-sm text-black">Min: {day.temp.min.toFixed(1)}°C</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => removeCity(cityWeather.city)}
                className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>

  );
}

export default App;