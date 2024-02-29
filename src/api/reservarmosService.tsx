import axios from 'axios';

export const searchCities = async (cityName: string) => {
  try {
    const response = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${cityName}`);
    const cities = response.data.filter((city: { result_type: string; }) => city.result_type === "city");
    return cities;
  } catch (error) {
    console.error('Failed to fetch city coordinates:', error);
    return null;
  }
};