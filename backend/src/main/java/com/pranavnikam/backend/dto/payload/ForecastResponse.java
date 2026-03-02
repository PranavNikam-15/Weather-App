package com.pranavnikam.backend.dto.payload;

import com.pranavnikam.backend.dto.DaySummary;

import java.util.ArrayList;
import java.util.List;

public class ForecastResponse {

    private WeatherResponse weatherResponse;
    private List<DaySummary> dailyForecast= new ArrayList<>();

    public WeatherResponse getWeatherResponse() {
        return weatherResponse;
    }

    public void setWeatherResponse(WeatherResponse weatherResponse) {
        this.weatherResponse = weatherResponse;
    }

    public List<DaySummary> getDailyForecast() {
        return dailyForecast;
    }

    public void setDailyForecast(List<DaySummary> dailyForecast) {
        this.dailyForecast = dailyForecast;
    }
}
