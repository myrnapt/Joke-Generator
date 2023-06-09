"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// VARIABLES
const printedJoke = document.getElementById("printedJoke");
const button = document.getElementById("button");
const rating1 = document.getElementById("rating-1");
const rating2 = document.getElementById("rating-2");
const rating3 = document.getElementById("rating-3");
const jokesArray = [];
// WEATHER APP
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        return __awaiter(this, void 0, void 0, function* () {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            try {
                const response = yield fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=26e4714b232ad047024b8f3db887092f`);
                const data = yield response.json();
                const weather = data.weather;
                const weatherDescription = weather[0].description;
                console.log(data);
                console.log(weatherDescription);
                document.getElementById('textWeather').innerHTML = `Weather today: ${weatherDescription}`;
            }
            catch (error) {
                console.error('Error fetching weather data:', error);
            }
        });
    });
}
// RANDOM NUMBER FOR API
function getRandomNumber() {
    return Math.round(Math.random());
}
// CONNECT WITH JOKES API
button.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield fetch("https://icanhazdadjoke.com/", {
            method: "GET",
            headers: { Accept: "application/json" },
        });
        if (!response.ok) {
            printedJoke.innerHTML = "HTTP error";
        }
        let joke = yield response.json();
        printedJoke.innerHTML = JSON.stringify(joke.joke);
        let newJokeObject = {
            joke: joke.joke,
            rating: 0,
            date: new Date().toISOString(),
        };
        jokesArray.push(newJokeObject);
        console.log(jokesArray);
    }
    catch (error) {
        printedJoke.innerHTML = "Error connecting to API";
    }
}));
// ONLY SHOW RATING AFTER CLICK
let iconsContainer = document.getElementById("icons-container");
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
