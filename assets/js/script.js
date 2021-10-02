var searchBtn = document.querySelector("#search-btn");
var resultsContainer = document.querySelector("#results-container");
var citySearchEl = document.querySelector("#city-search"); 
var infoContainerEl = document.querySelector("#info-container");

var currentDate = moment().format("MM/DD/YYYY");

var formSubmitHandler = function(event) {
  event.preventDefault();
  var alertEl = document.querySelector("#alert");

  var userCity = citySearchEl.value.trim();

  if (userCity) {
    getLatLong(userCity);
    citySearchEl.value = "";
    alertEl.classList.add("hide");
  }
  else {
    citySearchEl.value = "";
    alertEl.classList.remove("hide");
  }
};

var getLatLong = function(userInput) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=e6f1180431902688ee08af2326efb755`
  fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            var cityName = data.name
            getForecast(data, cityName)
          })
        }
      })
}

var getForecast = function(data, cityName) {
  resultsContainer.classList.remove("hide");
  var latEl = data.coord.lat
  var longEl = data.coord.lon
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latEl}&lon=${longEl}&units=imperial&appid=e6f1180431902688ee08af2326efb755`
  fetch(apiUrl)
      .then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayForecast(data, cityName)
          })
        }
      })
}


var displayForecast = function(weatherData, cityName) {
  var cityNameEl = document.querySelector("#city-name");
  var tempEl = document.querySelector("#temp");
  var windEl = document.querySelector("#wind");
  var humidityEL = document.querySelector("#humidity");
  var uvEl = document.querySelector("#uv-index");
  if (weatherData.status === "city not found") {
    console.log("Nothing");
  }
  else {
    cityNameEl.textContent = `${cityName} (${currentDate})`;
    tempEl.textContent += weatherData.current.temp
    windEl.textContent += weatherData.current.wind_speed
    humidityEL.textContent += weatherData.current.humidity
    uvEl.textContent = weatherData.current.uvi
    var uvIndex = weatherData.current.uvi
    if (uvIndex <= 2) {
      uvEl.classList.add("low")
    } 
    else if (3 <= uvIndex <= 7) {
      uvEl.classList.add("mid")
    }
    else if (uvIndex >= 8) {
      uvEl.classList.add("high")
    }
  }
}

searchBtn.addEventListener("click", formSubmitHandler);