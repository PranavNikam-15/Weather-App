import React from 'react';

const WeatherForm = ({ 
  city, 
  setCity, 
  showForecast, 
  setShowForecast, 
  forecastDays, 
  setForecastDays, 
  onSubmit, 
  loading 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSubmit();
    }
  };

  return (
    <div className="card search-card premium-card mb-4">
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-4">
              <label htmlFor="cityInput" className="form-label fw-semibold text-white">
                <i className="bi bi-search me-2"></i>Enter City Name
              </label>
              <div className="input-group">
                <span className="input-group-text bg-dark border-end-0">
                  <i className="bi bi-geo-alt mr-2"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 bg-dark text-white custom-input"
                  id="cityInput"
                  placeholder="e.g., Pune, Mumbai, London..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="col-12 col-md-3">
              <div className="form-check mt-md-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showForecast"
                  checked={showForecast}
                  onChange={(e) => setShowForecast(e.target.checked)}
                  disabled={loading}
                />
                <label className="form-check-label fw-semibold text-white" htmlFor="showForecast">
                  <i className="bi bi-calendar3 me-1"></i>
                  Show Forecast
                </label>
              </div>
            </div>
            
            {showForecast && (
              <div className="col-12 col-md-2">
                <label htmlFor="forecastDays" className="form-label fw-semibold text-white">
                  Days (1-6)
                </label>
                <select
                  className="form-select bg-dark text-white"
                  id="forecastDays"
                  value={forecastDays}
                  onChange={(e) => setForecastDays(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
                  disabled={loading}
                >
                  {[1, 2, 3, 4, 5, 6].map((day) => (
                    <option key={day} value={day}>
                      {day} {day === 1 ? 'Day' : 'Days'}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="col-auto d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-get-weather"
                disabled={loading || !city.trim()}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <>
                    <i className="bi bi-cloud-sun me-1"></i>
                    Get
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeatherForm;
