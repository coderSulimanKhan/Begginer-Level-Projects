const mainContainer = document.querySelector("main");
const searchContainer = document.querySelector("#search");
const weatherContainer = document.querySelector("#weather-data");
const searchBtn = document.querySelector("#search-btn");
const backToSearchBtn = document.querySelector("#back-to-search-btn");
let isWeatherDataVisible = false;

const validateUserInput = () => {
  const searchField = document.querySelector("#search-field");
  if (!searchField.value) {
    searchField.style.border = "2px solid red";
    return false;
  }
  return true;
}

if (isWeatherDataVisible) {
  searchContainer.style.display = "none";
  weatherContainer.style.display = "flex";
  backToSearchBtn.style.display = "flex";
} else if (!isWeatherDataVisible) {
  searchContainer.style.display = "flex"
  weatherContainer.style.display = "none"
  backToSearchBtn.style.display = "none";
}

const updateUI = () => {
  if (isWeatherDataVisible) {
    searchContainer.style.display = "none";
    weatherContainer.style.display = "flex";
    backToSearchBtn.style.display = "flex";
  } else if (!isWeatherDataVisible) {
    searchContainer.style.display = "flex"
    weatherContainer.style.display = "none"
    backToSearchBtn.style.display = "none";
  }
}

searchBtn.addEventListener("click", async () => {
  if (!validateUserInput()) {
    return;
  }
  isWeatherDataVisible = true;
  updateUI();
  const searchLocation = document.querySelector("#search-field").value;
  try {
    // Clear previous weather data
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=your_api_key&q=${searchLocation}`);
    const data = await response.json();

    if (!response.ok) {
      weatherContainer.innerHTML = "Error fetching weather data. Please try again.";
    }
    // set the night
    if (data.current.is_day === 0) {
      mainContainer.style.background = "url('./images/night.jpg')";
      mainContainer.style.backgroundSize = "cover";
      mainContainer.style.backgroundPosition = "center";
    }

    // set the day
    else if (data.current.is_day === 1) {
      mainContainer.style.background = "url('./images/day.jpg')";
      mainContainer.style.backgroundSize = "cover";
      mainContainer.style.backgroundPosition = "center";
    }

    // set the location name
    if (data.location.name) {
      document.querySelector("#location-name").innerHTML = data.location.name;
    } else {
      document.querySelector("#location-name").innerHTML = "Not found";
    }

    // set the temperature
    if (data.current.temp_c) {
      document.querySelector("#temperature").innerHTML = data.current.temp_c + "<sup>o</sup>";
    } else {
      document.querySelector("#temperature").innerHTML = "--";
    }

    // set the current condition
    if (data.current.condition.text) {
      document.querySelector("#current-condition").innerHTML = data.current.condition.text;
    } else {
      document.querySelector("#current-condition").innerHTML = "Not found";
    }

    // set the minimum and maximum temperatures
    const moreDataObj = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=your_api_key&q=${searchLocation}&days=1`)
    const moreData = await moreDataObj.json();
    if (moreData.forecast.forecastday[0].day) {
      document.querySelector("#min-max-temp").innerHTML = moreData.forecast.forecastday[0].day.mintemp_c + "<sup>o</sup>" + " / " + moreData.forecast.forecastday[0].day.maxtemp_c + "<sup>o</sup>";
    } else {
      document.querySelector("#min-max-temp").innerHTML = "--<sup>o</sup> / --<sup>o</sup>";
    }

    // set the rain rate
    if (moreData.forecast.forecastday[0].day) {
      document.querySelector("#rain-rate").innerText = moreData.forecast.forecastday[0].day.daily_chance_of_rain + "%";
    } else {
      document.querySelector("#rain-rate").innerText = "--%";
    }

    // set the humidity
    if (data.current.humidity) {
      document.querySelector("#humidity").innerText = data.current.humidity + "%";
    } else {
      document.querySelector("#humidity").innerText = "--%";
    }

    // set the feels like temperature
    if (data.current.feelslike_c) {
      document.querySelector("#feels-like").innerHTML = data.current.feelslike_c + "<sup>o</sup>";
    } else {
      document.querySelector("#feels-like").innerHTML = "--<sup>o</sup>";
    }

    // set the sunrise
    if (moreData.forecast.forecastday[0].astro) {
      document.querySelector("#sunrise").innerHTML = moreData.forecast.forecastday[0].astro.sunrise;
    } else {
      document.querySelector("#sunrise").innerHTML = "--:-- --";
    }

    // set the sunset
    if (moreData.forecast.forecastday[0].astro) {
      document.querySelector("#sunset").innerHTML = moreData.forecast.forecastday[0].astro.sunset;
    } else {
      document.querySelector("#sunset").innerHTML = "--:-- --";
    }

    // set the uv index
    if (data.current.uv === 0) {
      document.querySelector("#uv-index").innerHTML = data.current.uv;
    } else {
      document.querySelector("#uv-index").innerHTML = "--";
    }

  } catch (error) {
    weatherContainer.innerHTML = "Error fetching weather data. Please check your connection and try again.";
  }
});

backToSearchBtn.addEventListener("click", () => {
  searchContainer.style.display = "flex";
  weatherContainer.style.display = "none";
  backToSearchBtn.style.display = "none";
  location.reload();
});