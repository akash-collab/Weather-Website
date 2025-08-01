const ApiUrl = "/api/weather?city=";
let cityname = document.querySelector(".city");
let temp = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let desc = document.querySelector(".desc");
let wind = document.querySelector(".wind");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const high = document.querySelector(".temp1");
const low = document.querySelector(".temp2");
const lat = document.querySelector(".lat");
const lon = document.querySelector(".lon");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const sunrise = document.querySelector(".rise");
const sunset = document.querySelector(".set");
const pressure = document.querySelector(".pre");
const real_temp = document.querySelector(".real");
const visibility = document.querySelector(".viz");
const country = document.querySelector(".country");
const country_name = document.querySelector(".ctr");

async function checkWeather(city) {
    // Add timestamp to bypass cache
    const response = await fetch(`${ApiUrl}${city}&t=${Date.now()}`);

    if (response.status == 404) {
        error.style.display = "block";
        weather.style.display = "none";
        right.style.visibility = "hidden";
        left.style.visibility = "hidden";
    } else {
        let data = await response.json();
        cityname.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        desc.innerHTML = data.weather[0].main;
        wind.innerHTML = data.wind.speed + " km/h";
        console.log(data);
        high.innerHTML = data.main.temp_max + "°C";
        low.innerHTML = data.main.temp_min + "°C";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
        }

        lat.innerHTML = data.coord.lat;
        lon.innerHTML = data.coord.lon;

        pressure.innerHTML = data.main.pressure + "Pa";
        real_temp.innerHTML = Math.round(data.main.feels_like) + "°C";

        function convertUnixToTime(unixTimestamp) {
            const date = new Date(unixTimestamp * 1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
            return formattedTime;
        }

        sunrise.innerHTML = convertUnixToTime(data.sys.sunrise);
        sunset.innerHTML = convertUnixToTime(data.sys.sunset);
        visibility.innerHTML = (data.visibility / 1000) + " km";

        const countryCode = data.sys.country;
        const flagUrl = `https://flagsapi.com/${countryCode}/flat/64.png`;
        country.src = flagUrl;
        country_name.innerHTML = countryCode;

        right.style.visibility = "visible";
        left.style.visibility = "visible";
        weather.style.display = "block";
        error.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
window.onload = () => {
    searchBox.value = "";
    searchBox.focus();
};