let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dayTime = document.querySelector("#time");
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt=""></img>`;
  wind.innerHTML = response.data.wind.speed + " km/h";
  description.innerHTML = ", " + response.data.condition.description;
  humidity.innerHTML = response.data.temperature.humidity + " %";
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  let date = new Date(response.data.time * 1000);
  dayTime.innerHTML = formatDate(date);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = `753ef61a4c9704b0boa8ce19973atca6`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=753ef61a4c9704b0boa8ce19973atca6&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let week = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return week + " " + hour + ":" + minutes;
}
