import React, { useState } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';
import ForecastCard from '../components/ForecastCard';
import { getCurrentWeather, getForecast } from '../services/weatherService';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastDays, setForecastDays] = useState(3);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      const weatherData = await getCurrentWeather(city);
      setWeather(weatherData);

      if (showForecast) {
        const forecastData = await getForecast(city, forecastDays);
        setForecast(forecastData.dailyForecast);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="min-vh-100 d-flex flex-column" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', minHeight: '100vh' }}>
        <div className="container py-5 flex-grow-1">
          <div className="text-center mb-5">
            <h1 className="app-title">
              <i className="bi bi-cloud-sun-fill me-3 text-primary"></i>
              Weather App
            </h1>
            <p className="text-white-50">Get current weather and forecast for any city</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <WeatherForm
                city={city}
                setCity={setCity}
                showForecast={showForecast}
                setShowForecast={setShowForecast}
                forecastDays={forecastDays}
                setForecastDays={setForecastDays}
                onSubmit={fetchWeatherData}
                loading={loading}
              />
            </div>
          </div>

          {loading && (
            <div className="text-center my-5">
              <div className="spinner-grow text-primary" role="status" style={{ width: '2rem', height: '2rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-white-50">Fetching weather data...</p>
            </div>
          )}

          {error && !loading && (
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6">
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  <div>{error}</div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && weather && (
            <div className="row justify-content-center g-4">
              <div className="col-12 col-lg-8">
                <WeatherCard weather={weather} />
              </div>
              
              {showForecast && forecast && forecast.length > 0 && (
                <div className="col-12 col-lg-10">
                  <ForecastCard forecast={forecast} />
                </div>
              )}
            </div>
          )}

          {!loading && !error && !weather && (
            <div className="text-center my-5 py-5">
              <div className="empty-state">
                <i className="bi bi-cloud-sun display-1 text-white-50"></i>
                <h3 className="mt-4 text-white-50">Search for a City</h3>
                <p className="text-white-50">Enter a city name above to get the current weather and optional forecast.</p>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center py-3">
          <p className="text-white-50 small mb-0">
            <i className="bi bi-heart-fill text-danger me-1"></i>
            @Pranav-Nikam
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
