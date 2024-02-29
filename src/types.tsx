export type Coordinates = {latitude: number, longitude: number};

export type CityOption = {
    city_name: string;
    state: string;
    country: string;
    lat?: number; // Assuming latitude and longitude might be optional or not present in all city objects
    long?: number;
  }
  
  export type WeatherData = {
    city: string;
    data: {
      [x: string]: any;
      daily: Array<{
        dt: number;
        temp: {
          max: number;
          min: number;
        };
      }>;
    };
  }
  