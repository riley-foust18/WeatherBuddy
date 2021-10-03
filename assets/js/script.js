var searchBtn = document.querySelector("#search-btn");
var resultsContainer = document.querySelector("#results-container");
var citySearchEl = document.querySelector("#city-search"); 
var infoContainerEl = document.querySelector("#info-container");
var forecastRowEl = document.querySelector("#forecast-row");

var currentDate = moment().format("MM/DD/YYYY");
var dayIndex = 1
var forecastArray = ["Temp:", "Wind:", "Humidity:"];



var formSubmitHandler = function(event) {
  event.preventDefault();
  var alertEl = document.querySelector("#alert");

  var userCity = citySearchEl.value.trim();

  if (userCity) {
    getLatLong(userCity);
    citySearchEl.value = "";
    alertEl.className = "hide";
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
  var iconImg = document.querySelector("#icon-img");
  if (weatherData.status === "city not found") {
    console.log("Nothing");
  }
  else {
    iconImg.src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}.png`
    cityNameEl.textContent = `${cityName} (${currentDate})`;
    tempEl.textContent = weatherData.current.temp
    windEl.textContent = weatherData.current.wind_speed
    humidityEL.textContent = weatherData.current.humidity
    uvEl.textContent = weatherData.current.uvi
    var uvIndex = weatherData.current.uvi
    if (uvIndex <= 2) {
      uvEl.className = "low"
    } 
    else if (3 <= uvIndex <= 7) {
      uvEl.className = "mid"
    }
    else if (uvIndex >= 8) {
      uvEl.className = "high"
    }
    var i = 0;
    $(".forecast-box").each(function() {
      var futureDay = moment().add(dayIndex, "days").format("MM/DD/YYYY");
      var futureDate = $(this).find("span")[0];
      var futureTemp = $(this).find("span")[1];
      var futureWind = $(this).find("span")[2];
      var futureHumidity = $(this).find("span")[3];
      var futureIcon = $(this).find("img")[0];
      futureDate.textContent = futureDay;
      futureIcon.src = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}.png`
      futureTemp.textContent = weatherData.daily[i].temp.day;
      futureWind.textContent = weatherData.daily[i].wind_speed;
      futureHumidity.textContent = weatherData.daily[i].humidity;
      i++;
      dayIndex++;
    })

    // for (var i = 0; i < weatherData.daily.length - 3; i++) {
    //   var futureDay = moment().add(dayIndex, "days").format("MM/DD/YYYY");
    //   var forecastBoxEl = document.createElement("div");
    //   var futureDate = document.createElement("h5");
    //   var futureIcon = document.createElement("img");
    //   var futureTemp = document.createElement("p");
    //   var futureWind = document.createElement("p");
    //   var futureHumidity = document.createElement("p");
    //   futureDate.textContent = futureDay;
    //   futureIcon.src = `http://openweathermap.org/img/wn/${weatherData.daily[i].weather[0].icon}.png`
    //   futureTemp.textContent = `Temp: ${weatherData.daily[i].temp.day}°F`
    //   futureWind.textContent = `Wind: ${weatherData.daily[i].wind_speed} MPH`
    //   futureHumidity.textContent = `Humidity: ${weatherData.daily[i].humidity}%`
    //   forecastBoxEl.className = "forecast-box col-2";
    //   forecastBoxEl.appendChild(futureDate);
    //   forecastBoxEl.appendChild(futureIcon);
    //   forecastBoxEl.appendChild(futureTemp);
    //   forecastBoxEl.appendChild(futureWind);
    //   forecastBoxEl.appendChild(futureHumidity);
    //   forecastRowEl.appendChild(forecastBoxEl);
    //   dayIndex++;
    // }
  }
}

searchBtn.addEventListener("click", formSubmitHandler);