let recommendedCities = document.querySelector("#recommendedCities");
let weatherElem = document.querySelector("#weather");
let searchInp = document.querySelector("input");
let weatherBtn = document.querySelector("#weatherBtn");
let weatherIcon = document.querySelector("#weather-icon img");

let cities = [
    { "name": "New York", "country": "USA", "latitude": 40.7128, "longitude": -74.0060 },
    { "name": "Los Angeles", "country": "USA", "latitude": 34.0522, "longitude": -118.2437 },
    { "name": "Chicago", "country": "USA", "latitude": 41.8781, "longitude": -87.6298 },
    { "name": "Houston", "country": "USA", "latitude": 29.7604, "longitude": -95.3698 },
    { "name": "London", "country": "United Kingdom", "latitude": 51.5074, "longitude": -0.1278 },
    { "name": "Manchester", "country": "United Kingdom", "latitude": 53.4808, "longitude": -2.2426 },
    { "name": "Birmingham", "country": "United Kingdom", "latitude": 52.4862, "longitude": -1.8904 },
    { "name": "Paris", "country": "France", "latitude": 48.8566, "longitude": 2.3522 },
    { "name": "Marseille", "country": "France", "latitude": 43.2965, "longitude": 5.3698 },
    { "name": "Berlin", "country": "Germany", "latitude": 52.5200, "longitude": 13.4050 },
    { "name": "Munich", "country": "Germany", "latitude": 48.1351, "longitude": 11.5820 },
    { "name": "Rome", "country": "Italy", "latitude": 41.9028, "longitude": 12.4964 },
    { "name": "Milan", "country": "Italy", "latitude": 45.4642, "longitude": 9.1900 },
    { "name": "Madrid", "country": "Spain", "latitude": 40.4168, "longitude": -3.7038 },
    { "name": "Barcelona", "country": "Spain", "latitude": 41.3851, "longitude": 2.1734 },
    { "name": "Lisbon", "country": "Portugal", "latitude": 38.7223, "longitude": -9.1393 },
    { "name": "Amsterdam", "country": "Netherlands", "latitude": 52.3676, "longitude": 4.9041 },
    { "name": "Brussels", "country": "Belgium", "latitude": 50.8503, "longitude": 4.3517 },
    { "name": "Zurich", "country": "Switzerland", "latitude": 47.3769, "longitude": 8.5417 },
    { "name": "Vienna", "country": "Austria", "latitude": 48.2082, "longitude": 16.3738 },
    { "name": "Oslo", "country": "Norway", "latitude": 59.9139, "longitude": 10.7522 },
    { "name": "Stockholm", "country": "Sweden", "latitude": 59.3293, "longitude": 18.0686 },
    { "name": "Copenhagen", "country": "Denmark", "latitude": 55.6761, "longitude": 12.5683 },
    { "name": "Helsinki", "country": "Finland", "latitude": 60.1699, "longitude": 24.9384 },
    { "name": "Tokyo", "country": "Japan", "latitude": 35.6895, "longitude": 139.6917 },
    { "name": "Osaka", "country": "Japan", "latitude": 34.6937, "longitude": 135.5023 },
    { "name": "Seoul", "country": "South Korea", "latitude": 37.5665, "longitude": 126.9780 },
    { "name": "Beijing", "country": "China", "latitude": 39.9042, "longitude": 116.4074 },
    { "name": "Shanghai", "country": "China", "latitude": 31.2304, "longitude": 121.4737 },
    { "name": "Hong Kong", "country": "China (SAR)", "latitude": 22.3193, "longitude": 114.1694 },
    { "name": "Singapore", "country": "Singapore", "latitude": 1.3521, "longitude": 103.8198 },
    { "name": "Bangkok", "country": "Thailand", "latitude": 13.7563, "longitude": 100.5018 },
    { "name": "Jakarta", "country": "Indonesia", "latitude": -6.2088, "longitude": 106.8456 },
    { "name": "Sydney", "country": "Australia", "latitude": -33.8688, "longitude": 151.2093 },
    { "name": "Melbourne", "country": "Australia", "latitude": -37.8136, "longitude": 144.9631 },
    { "name": "Delhi", "country": "India", "latitude": 28.7041, "longitude": 77.1025 },
    { "name": "Mumbai", "country": "India", "latitude": 19.0760, "longitude": 72.8777 },
    { "name": "Bengaluru", "country": "India", "latitude": 12.9716, "longitude": 77.5946 },
    { "name": "Chennai", "country": "India", "latitude": 13.0827, "longitude": 80.2707 },
    { "name": "Karachi", "country": "Pakistan", "latitude": 24.8607, "longitude": 67.0011 },
    { "name": "Lahore", "country": "Pakistan", "latitude": 31.5204, "longitude": 74.3587 },
    { "name": "Dubai", "country": "UAE", "latitude": 25.2048, "longitude": 55.2708 },
    { "name": "Riyadh", "country": "Saudi Arabia", "latitude": 24.7136, "longitude": 46.6753 },
    { "name": "Istanbul", "country": "Turkey", "latitude": 41.0082, "longitude": 28.9784 },
    { "name": "Cairo", "country": "Egypt", "latitude": 30.0444, "longitude": 31.2357 },
    { "name": "Johannesburg", "country": "South Africa", "latitude": -26.2041, "longitude": 28.0473 },
    { "name": "São Paulo", "country": "Brazil", "latitude": -23.5505, "longitude": -46.6333 },
    { "name": "Buenos Aires", "country": "Argentina", "latitude": -34.6037, "longitude": -58.3816 },
    { "name": "Toronto", "country": "Canada", "latitude": 43.6532, "longitude": -79.3832 },
    { "name": "Vancouver", "country": "Canada", "latitude": 49.2827, "longitude": -123.1207 }
];

cities.forEach((e) => {
    recommendedCities.innerHTML += `
        <div class="city" data-city="${e.name}">
            <h1>${e.name}</h1>
            <h2>${e.country}</h2>
            <p>${e.latitude}</p>
            <p>${e.longitude}</p>
        </div>
    `;
});

recommendedCities.addEventListener("click", (e) => {
    if (!e.target.matches("#recommendedCities")) {
        let city;
        if (!e.target.matches(".city")) {
            city = e.target.parentElement.getAttribute("data-city");
        } else {
            city = e.target.getAttribute("data-city");
        }
        getWeather(city);
    }
});

async function getWeather(city) {
    weatherElem.innerHTML = `<p>Loading..</p>`;
    weatherIcon.src = "/Images/unknown.png";
    const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    ).then(r => r.json());

    if (!geo.results || geo.results.length === 0) {
        weatherElem.innerHTML = `<p>City not found!</p>`;
        return;
    }

    const { latitude, longitude } = geo.results[0];

    const weather = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    ).then(res => res.json());

    const code = weather.current_weather.weathercode;
    const iconFile = getWeatherIcon(code);
    weatherIcon.src = "/Images/" + iconFile;

    weatherElem.innerHTML = `<h1>${city}</h1>
        <div>
            <p>Latitute : ${weather.latitude}</p>
            <p>Longitutue : ${weather.longitude}</p>
        </div>
        <p>${weather.current_weather.is_day === 1 ? "Day 🌞" : "Night 🌙"}</p>
        <div>
            <p>Temparature : <span>${weather.current_weather.temperature + weather.current_weather_units.temperature}</span></p>
            <p>Time : <span>${weather.current_weather.time}</span></p>
            <p>Wind direction : <span>${weather.current_weather.winddirection + weather.current_weather_units.winddirection}</span></p>
            <p>Wind Speed : <span>${weather.current_weather.windspeed + weather.current_weather_units.windspeed}</span></p>
        </div>
    `
}

getWeather("bangalore");


function getWeatherIcon(code) {
    const icons = {
        0: "sunny.png",
        1: "mostly_sunny.png",
        2: "partly_cloudy.png",
        3: "cloudy.png",

        45: "fog.png",
        48: "fog.png",

        51: "drizzle.png",
        53: "drizzle.png",
        55: "drizzle.png",

        61: "rain.png",
        63: "rain.png",
        65: "heavy_rain.png",

        80: "showers.png",
        81: "showers.png",
        82: "heavy_showers.png",

        71: "snow.png",
        73: "snow.png",
        75: "heavy_snow.png",
        77: "snow.png",
        85: "snow_showers.png",
        86: "snow_showers.png",

        95: "thunder.png",
        96: "hail.png",
        99: "hail.png"
    };

    return icons[code] || "unknown.png";
}

weatherBtn.addEventListener("click", () => {
    let val = searchInp.value.trim();
    if (val === "") {
        searchInp.setAttribute("placeholder", "Please enter some city...");
    } else {
        searchInp.value = "";
        getWeather(val);
    }
});