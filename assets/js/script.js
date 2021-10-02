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

searchBtn.addEventListener("click", formSubmitHandler);