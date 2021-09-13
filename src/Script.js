//Date and time

function displayDate() {
  let now = new Date();
  let todaysDate = document.querySelector("#currentTime");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  todaysDate.innerHTML = `${day} ${hour}:${minute}`;
}
displayDate();

//Weather Function
let unit = "metric";
let urlSource = "https://api.openweathermap.org/data/2.5/weather?";
let appId = "93b4374da9dab6e7d8fc281a4d8ee692";

function showWeather(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let todaysTemperature = document.querySelector("#dayZeroTemp");
  todaysTemperature.innerHTML = `${temperature}°C`;
  let wind = Math.round(response.data.wind.speed);
  let todaysWind = document.querySelector("#dayZeroWind");
  todaysWind.innerHTML = `${wind} mph`;
  let humidity = response.data.main.humidity;
  let todaysHumidity = document.querySelector("#dayZeroHum");
  todaysHumidity.innerHTML = `${humidity}%`;
}

//Default city
function defaultCity(city) {
  let apiUrl = `${urlSource}q=brighton&appid=${appId}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}
defaultCity();

//City searched

function citySearched(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  let apiUrl = `${urlSource}q=${city}&appid=${appId}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#searchBar");
form.addEventListener("submit", citySearched);

// Current Location button

function automaticPosition() {
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiURL = `${urlSource}lat=${latitude}&lon=${longitude}&appid=${appId}&units=${unit}`;
    axios.get(apiURL).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let reloadButton = document.querySelector("#reloadButton");
reloadButton.addEventListener("click", automaticPosition);

//Units buttons

//function displayUnits(event) {
//function toCelcius() {
//dayZeroUnit.innerHTML = "10°C";
//dayOneUnit.innerHTML = "10°C";
//dayTwoUnit.innerHTML = "10°C";
//dayThreeUnit.innerHTML = "10°C";
//dayFourUnit.innerHTML = "10°C";
//}
//function toFarenheit() {
//dayZeroUnit.innerHTML = "50°F";
//dayOneUnit.innerHTML = "50°F";
//dayTwoUnit.innerHTML = "50°F";
//dayThreeUnit.innerHTML = "50°F";
//dayFourUnit.innerHTML = "50°F";
//}

//let celcius = document.querySelector("#celciusButton");
//celcius.addEventListener("click", toCelcius);
//let farenheit = document.querySelector("#farenheitButton");
//farenheit.addEventListener("click", toFarenheit);
//}
