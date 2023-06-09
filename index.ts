// VARIABLES
const printedJoke = document.getElementById("printedJoke") as HTMLDivElement;
const button = document.getElementById("button") as HTMLButtonElement;
const rating1 = document.getElementById("rating-1") as HTMLButtonElement;
const rating2 = document.getElementById("rating-2") as HTMLButtonElement;
const rating3 = document.getElementById("rating-3") as HTMLButtonElement;


// CREATE ARRAY OF OBJETCTS
interface JokesArray {
  joke: string;
  rating: number;
  date: string;
}

const jokesArray: JokesArray[] = [];

// WEATHER APP
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26e4714b232ad047024b8f3db887092f`);
      const data = await response.json();
      const weather = data.weather;
      const weatherDescription = weather[0].description;
      console.log(data);
      console.log(weatherDescription);
      document.getElementById('textWeather')!.innerHTML = `Weather today: ${weatherDescription}`;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  });
}

// RANDOM NUMBER FOR API
function getRandomNumber() {
  return Math.round(Math.random());
}

// CONNECT WITH JOKES API
button.addEventListener("click", async () => {
  try {

    let response = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      printedJoke.innerHTML = "HTTP error";
    }
    let joke = await response.json();
    printedJoke.innerHTML = JSON.stringify(joke.joke);
    let newJokeObject: JokesArray = {
      joke: joke.joke,
      rating: 0,
      date: new Date().toISOString(),
    };
    jokesArray.push(newJokeObject);
    console.log(jokesArray);

  } catch (error) {
    printedJoke.innerHTML = "Error connecting to API";
  }
});

// ONLY SHOW RATING AFTER CLICK
let iconsContainer = document.getElementById(
  "icons-container"
) as HTMLDivElement;
button.addEventListener("click", () => {
  iconsContainer.style.display = "block";
});

// RATING BUTTONS
rating1.addEventListener("click", () => {
  jokesArray.forEach((jokesArray) => {
    jokesArray.rating = 1;
    console.log(jokesArray.rating);
  });
});
rating2.addEventListener("click", () => {
  jokesArray.forEach((jokesArray) => {
    jokesArray.rating = 2;
    console.log(jokesArray.rating);
  });
});
rating3.addEventListener("click", () => {
  jokesArray.forEach((jokesArray) => {
    jokesArray.rating = 3;
    console.log(jokesArray.rating);
  });
});


/*  // Mostrem l'icone del temps pel DOM mitjançant el codi que ens retorna l'API
  let iconeTemp = document.getElementById("icone") as HTMLImageElement;
  iconeTemp.src = `https://www.weatherbit.io/static/img/icons/${meteoIcone}.png`;
  // Mostrem la temperatura tornada
  let temperatura = document.getElementById("meteo") as HTMLElement;
  temperatura.innerHTML = `${meteoTemp} ºC`;
  */