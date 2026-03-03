import React from 'react';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const ForecastCard = ({ forecast }) => {
  if (!forecast || !forecast.length) return null;

  return (
    <div className="card forecast-card premium-card">
      <div className="card-header bg-transparent border-0 pt-3">
        <h5 className="mb-0 text-white">
          <i className="bi bi-calendar-week me-2"></i>
          {forecast.length} Day Forecast
        </h5>
      </div>
      <div className="card-body p-2">
        <div className="row g-3">
          {forecast.map((day, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div className="forecast-day-card h-100">
                <div className="forecast-date small mb-2">
                  {formatDate(day.date)}
                </div>
                <div className="forecast-temps">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="temp-max fw-bold text-warning">
                      <i className="bi bi-arrow-up me-1"></i>
                      {Math.round(day.max_temp)}°C
                    </span>
                    <span className="temp-min fw-bold text-info">
                      <i className="bi bi-arrow-down me-1"></i>
                      {Math.round(day.min_temp)}°C
                    </span>
                  </div>
                </div>
                <div className="forecast-avg mt-2">
                  <span className="badge bg-secondary bg-opacity-25 text-light">
                    Avg: {Math.round(day.avg_temp)}°C
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
