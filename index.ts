// VARIABLES
const reportJokes: {joke: string; score: number; date: string}[] = []
let jokePrint: string = ''

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
        document.getElementById('weather')!.innerHTML = `<div id="weather">Weather today: <em class='text-light opacity-75'>${weatherDescription} </em></div>` ;
      } catch (error) {
        document.getElementById('weather')!.innerHTML = 'Connecting error';
      }
    });
  }

  // API 1
  const getJoke = async () => {
    let jokeHTML = document.getElementById("printedJoke") as HTMLElement;

    try {
      let jokes = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      let data = await jokes.json();
      jokePrint = data.joke;
      jokeHTML.innerHTML =  jokePrint;
    } catch (error) {
      jokeHTML.innerHTML = 'ERROR CONNECTING TO API';
    }
  };

// API 2
  const getJoke2 = async () => {
    let jokeHTML = document.getElementById("printedJoke") as HTMLElement;
    try {
      let jokes = await fetch("https://api.chucknorris.io/jokes/random");
      let data = await jokes.json();
      jokePrint = data.value;
      jokeHTML.innerHTML = jokePrint;
    } catch (error) {
      jokeHTML.innerHTML = 'ERROR CONNECTING TO API';
    }
  };

// PRINT RANDOM JOKE
  const randomizeJoke = () => {
    let randomJoke = Math.floor(Math.random() * 10);
    randomJoke >= 5 ? getJoke() : getJoke2();
    let nextHTML = document.getElementById("button") as HTMLElement;
    nextHTML.innerHTML = "Next joke";
  };
  
  // SHOW SCORE BUTTONS
  let iconsContainer = document.getElementById(
    "icons-container"
    ) as HTMLDivElement;
    let button = document.getElementById('button') as HTMLButtonElement
  button.addEventListener("click", () => {
    iconsContainer.style.display = "block";
  });


  // SCORE
    const scoreButton = (score: number) => {
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
