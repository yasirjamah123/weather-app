document.addEventListener("DOMContentLoaded", function () {
    const cityForm = document.getElementById("city-form");
    const cityInput = document.getElementById("city-input");
    const currentWeather = document.getElementById("current-weather");
    const forecast = document.getElementById("forecast");

    cityForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const cityName = cityInput.value;
        getWeatherData(cityName);
    });

    function getWeatherData(cityName) {
        const apiKey = '4f1ebba4b62541f9bf4b4972c7eaf5dc'; 
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
            .then(response => response.json())
            .then(data => {
                displayCurrentWeather(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                displayForecast(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayCurrentWeather(data) {
        const temperatureCelsius = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        currentWeather.innerHTML = `
            <h2>${data.name}</h2>
            <p>Temperature: ${temperatureCelsius}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    }

    function displayForecast(data) {
        forecast.innerHTML = `<h2>5-Day Forecast</h2>`;

        // Loop through the forecast data and display it
        for (let i = 0; i < data.list.length; i += 8) {
            const forecastItem = data.list[i];
            const temperatureCelsius = (forecastItem.main.temp - 273.15).toFixed(2);
            const humidity = forecastItem.main.humidity;
            const windSpeed = forecastItem.wind.speed;
            const dateTime = new Date(forecastItem.dt * 1000);

            forecast.innerHTML += `
                <div class="forecast-item">
                    <p>Date: ${dateTime.toLocaleDateString()}</p>
                    <p>Temperature: ${temperatureCelsius}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} m/s</p>
                </div>
            `;
        }
    }
});
