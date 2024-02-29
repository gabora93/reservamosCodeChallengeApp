import axios from 'axios';
import { Coordinates } from '../types';

export const fetchWeather = async (coords: Coordinates) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const weatherURL = import.meta.env.VITE_WEATHER_API_URL;
  try {
    const response = await axios.get(`${weatherURL}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`);
    return response.data.daily;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};