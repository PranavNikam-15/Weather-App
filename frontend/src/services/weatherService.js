const BASE_URL = import.meta.env.VITE_WEATHER_API_BACKEND_URL;

export const getCurrentWeather = async (city) => {
  const response = await fetch(`${BASE_URL}${city}`);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (data && data.message) {
      throw new Error(data.message);
    }

    if (response.status === 404) {
      throw new Error('City not found.');
    }

    throw new Error('Failed to fetch weather data. Please try again later.');
  }

  return data;
};

export const getForecast = async (city, days) => {
  const response = await fetch(`${BASE_URL}forecast?city=${city}&days=${days}`);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (data && data.message) {
      throw new Error(data.message);
    }
    if (response.status === 404) {
      throw new Error('City not found.');
    }

    throw new Error('Failed to fetch forecast data. Please try again later.');
  }
  return data;
};