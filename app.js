const main = document.getElementsByClassName("main");

const notes = [];

// AÑADIR NOTAS
const noteSubmit = document.getElementById("note-submit");

function addNote(title = "", body, color, trash = false, pinned = false) {
  const noteTitle = document.getElementById("note-title").value;
  const noteBody = document.getElementById("note-body").value;

  const note = {
    title: noteTitle,
    body: noteBody,
    color: "white",
    trash: this.trash,
    pinned: this.pinned,
    updatedAt: Date.now(),
  };

  notes.push(note);
  console.log(`${noteTitle} ${noteBody}`);
  console.log(notes);
}

noteSubmit.addEventListener("click", addNote);

function initialize() {
  showForecast();
}

function showForecast() {
  let forecastContainer = document.getElementById("forecast");

  if (!navigator.geolocation) {
    forecastContainer.innerHTML =
      "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  async function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a805969695e94499b60e5a34386cd551&units=metric`
    );
    const data = await response.json();
    const dataWeather = await data.message;
    console.log(data);

    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const weather_description = data.weather[0].description;
    // const weather_icon = data.weather[0].icon;

    forecastContainer.innerHTML =
      "<p>Welcome to {keepable}. Today's Forecast for " +
      city +
      ", " +
      country +
      ": " +
      temperature +
      "°, " +
      weather_description.charAt(0).toUpperCase() +
      weather_description.slice(1) +
      "</p>";
  }

  function error() {
    forecastContainer.innerHTML = "Unable to retrieve your location";
  }

  forecastContainer.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}
