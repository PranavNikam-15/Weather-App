package com.pranavnikam.backend.service;

import com.pranavnikam.backend.dto.DaySummary;
import com.pranavnikam.backend.dto.Forecast;
import com.pranavnikam.backend.dto.Forecastday;
import com.pranavnikam.backend.dto.Root;
import com.pranavnikam.backend.dto.payload.ForecastResponse;
import com.pranavnikam.backend.dto.payload.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;
    @Value("${weather.api.url}")
    private String apiUrl;
    @Value("${weather.api.forecast.url}")
    private String forecastApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<WeatherResponse> getWeatherData(String city) {
        try{

            String url = apiUrl + "key=" + apiKey + "&q=" + city;
            Root rootResponse = restTemplate.getForObject(url, Root.class);
            if(rootResponse == null || rootResponse.getLocation() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.ok(mapToWeatherResponse(rootResponse, city));

        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    public ResponseEntity<ForecastResponse> getForecastWeatherData(String city, int days) {
        try {

            String url = forecastApiUrl + "key=" + apiKey + "&q=" + city + "&days=" + days;
            Root rootResponse = restTemplate.getForObject(url, Root.class);
            if(rootResponse == null || rootResponse.getLocation() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            WeatherResponse weather = mapToWeatherResponse(rootResponse, city);
            Forecast forecast = rootResponse.getForecast();
            List<DaySummary> daySummaryList = mapToDaySummaryList(forecast.getForecastday());

            ForecastResponse forecastResponse = new ForecastResponse();
            forecastResponse.setWeatherResponse(weather);
            forecastResponse.setDailyForecast(daySummaryList);
            return ResponseEntity.ok(forecastResponse);

        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    private List<DaySummary> mapToDaySummaryList(List<Forecastday> forecastdays) {
        List<DaySummary> list = new ArrayList<>();
        if (forecastdays != null) {
            for(Forecastday day : forecastdays) {
                DaySummary ds = new DaySummary();
                ds.setDate(day.getDate());
                ds.setMin_temp(day.getDay().getMintemp_c());
                ds.setAvg_temp(day.getDay().getAvgtemp_c());
                ds.setMax_temp(day.getDay().getMaxtemp_c());
                list.add(ds);
            }
        }
        return list;
    }


    private WeatherResponse mapToWeatherResponse(Root root, String city) {
        WeatherResponse response = new WeatherResponse();
        response.setCity(root.getLocation().getName());
        response.setRegion(root.getLocation().getRegion());
        response.setCountry(root.getLocation().getCountry());
        response.setCondition(root.getCurrent().getCondition().getText());
        response.setTemperature(root.getCurrent().getTemp_c());
        return response;
    }
}