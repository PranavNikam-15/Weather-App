package com.pranavnikam.backend.controller;

import com.pranavnikam.backend.dto.payload.ForecastResponse;
import com.pranavnikam.backend.dto.payload.WeatherResponse;
import com.pranavnikam.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/weather")
public class Controller {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    public ResponseEntity<WeatherResponse> getWeather(@PathVariable String city) {
        return weatherService.getWeatherData(city);
    }

    @GetMapping("/forecast")
    public ResponseEntity<ForecastResponse> getForecastWeather(@RequestParam String city, @RequestParam int days) {
        return weatherService.getForecastWeatherData(city, days);
    }
}