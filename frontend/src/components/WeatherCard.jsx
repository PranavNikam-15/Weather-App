import React from 'react';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="card weather-card premium-card">
      <div className="card-body text-center p-2">
        <h2 className="card-title city-name mb-1">
          <i className="bi bi-geo-alt me-2"></i>
          {weather.city}
        </h2>
        
        <p className="card-subtitle region-country mb-2">
          {weather.region}, {weather.country}
        </p>
        
        <div className="condition-badge mb-2">
          <span className="badge fs-6" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
            {weather.condition}
          </span>
        </div>
        
        <div className="temperature-display">
          <span className="temperature-value">{Math.round(weather.temperature)}</span>
          <span className="temperature-unit">°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
