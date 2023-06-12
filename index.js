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
const reportJokes = [];
let jokePrint = '';
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
                document.getElementById('weather').innerHTML = `<div id="weather">Weather today: <em class='text-light opacity-75'>${weatherDescription} </em></div>`;
            }
            catch (error) {
                document.getElementById('weather').innerHTML = 'Connecting error';
            }
        });
    });
}
// API 1
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    let jokeHTML = document.getElementById("printedJoke");
    try {
        let jokes = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });
        let data = yield jokes.json();
        jokePrint = data.joke;
        jokeHTML.innerHTML = jokePrint;
    }
    catch (error) {
        jokeHTML.innerHTML = 'ERROR CONNECTING TO API';
    }
});
// API 2
const getJoke2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let jokeHTML = document.getElementById("printedJoke");
    try {
        let jokes = yield fetch("https://api.chucknorris.io/jokes/random");
        let data = yield jokes.json();
        jokePrint = data.value;
        jokeHTML.innerHTML = jokePrint;
    }
    catch (error) {
        jokeHTML.innerHTML = 'ERROR CONNECTING TO API';
    }
});
// PRINT RANDOM JOKE
const randomizeJoke = () => {
    let randomJoke = Math.floor(Math.random() * 10);
    randomJoke >= 5 ? getJoke() : getJoke2();
    let nextHTML = document.getElementById("button");
    nextHTML.innerHTML = "Next joke";
};
// SHOW SCORE BUTTONS
let iconsContainer = document.getElementById("icons-container");
let button = document.getElementById('button');
button.addEventListener("click", () => {
    iconsContainer.style.display = "block";
});
// SCORE
const scoreButton = (score) => {
    let report = {
        joke: jokePrint,
        score: score,
        date: new Date().toISOString(),
    };
    const index = reportJokes.findIndex(obj => obj.joke == report.joke);
    if (index !== -1) {
        reportJokes[index] = report;
    }
    else {
        reportJokes.push(report);
    }
    console.log(reportJokes);
};
