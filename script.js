function searchCities() {
    const cityInput = document.getElementById('cityInput').value;
    const searchResults = document.getElementById('searchResults');
    const limit = 5;
    const APIkey = "0cf12d75c6144bfff43b1d1d79cf5b40";
    const apiEndpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=${limit}&appid=${APIkey}`

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            searchResults.innerHTML = '';

            if (cityInput.trim() !== '') {
                glassContainer.style.display = 'flex';
                weatherCard.style.display = 'flex';
                date.style.display = 'block'
            } else {
                glassContainer.style.display = 'none';
                weatherCard.style.display = 'none';
                date.style.display = 'none';
            }

            data.forEach(result => {
                const listItem = document.createElement('li');
                listItem.innerText = result.name + ", " + result.state + ", " + result.country;
                listItem.onclick = function () {
                    document.getElementById('cityInput').value = result.name + ", " + result.state + ", " + result.country;
                    searchWeather(result.lat, result.lon, result.name);
                };
                searchResults.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching cities:', error);
        });

    function searchWeather(latitude, longitude) {
        const weatherTitle = document.getElementById('weatherTitle');
        const weatherDescription = document.getElementById('weatherDescription');
        const mainWeather = document.getElementById('mainweather')
        const wicon = document.getElementById('wicon');
        const temperature = document.getElementById('temperature');
        const feelsLike = document.getElementById('feelslike');
        const atmPressure = document.getElementById('atmPressure');
        const humidity = document.getElementById('humidity');
        const windspeed = document.getElementById('windSpeed');
        const degree = document.getElementById('degree');
        const clouds = document.getElementById('clouds');
        const dateElement = document.getElementById('date');
        const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;

        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                weatherTitle.innerText = data.name + ", " + data.sys.country;
                wicon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                mainWeather.innerText = data.weather[0].main;
                weatherDescription.innerText = data.weather[0].description.toUpperCase();
                temperature.innerText = "Temperature: " + data.main.temp + "°C";
                feelsLike.innerText = "Feels Like: " + data.main.feels_like + "°C";
                atmPressure.innerText = "Atm-Pressure: " + data.main.pressure + "hPa";
                humidity.innerText = "Humidity: " + data.main.humidity + "%";
                windspeed.innerText = "Wind Speed: " + data.wind.speed + "m/s";
                degree.innerText = "Direction: " + data.wind.deg + "°";
                clouds.innerText = data.clouds.all + "% Clouds";
                const timestamp = data.dt;
                const localDate = new Date(timestamp * 1000);
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZoneName: 'short'
                };
                const formattedLocalDate = localDate.toLocaleDateString('en-US', options);
                dateElement.innerText = "Last updated on: " + formattedLocalDate;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
}