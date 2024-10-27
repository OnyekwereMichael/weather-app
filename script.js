
// const apiKey = "d347d35b6f3ecab8e5037ad29b23872c";

// const inputElement = document.getElementById("js-input")
// const form = document.querySelector("form")
// const weather_data = document.getElementById('content')
// const weather_details = document.getElementById('details')
// const icon = document.querySelector(".ico")

// form.addEventListener('submit', (event) => {
//  event.preventDefault()
//  const inputValue = inputElement.value
//  getWeather(inputValue)
//  inputElement.value = ""
// })

// async function getWeather(inputValue) {
//     try {
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metrics
//         `)


//         if(!response.ok){
//             throw new Error("Network response was not ok")
//         }

      

//         const data = await response.json()
//         console.log(data)
        

//        const temp = Math.round(data.main.temp)
//        const description = data.weather[0].description
//        const main = data.weather[0].main;
//        const humidity = data.main.humidity
//        const wind_speed = data.wind.speed;

//     //    weather_data.querySelector('.ico').innerHTML =`<img src="http://openweathermap.org/img/wn/${image}.png" alt="weather icon"/>`

//     if(main == "Clouds"){
//         icon.innerHTML = `<img src = "image/clouds.png">`
//      }else if(main == "Clear"){
//         icon.innerHTML = `<img src = "image/clear.png">`
//      }else if(main == "Mist"){
//         icon.innerHTML = `<img src = "image/mist.png">`
//      }else if(main == "Rain"){
//         icon.innerHTML = `<img src = "image/rain.png">`
//      }else if(main == "Drizzle"){
//         icon.innerHTML = `<img src = "image/drizzle.png">`
//      }
//        weather_data.querySelector(".temp").textContent = `${temp}°c`
//        weather_data.querySelector(".clouds").textContent = `${description}`
//        weather_data.querySelector(".details .Humidity").textContent = `Humidity ${humidity}`
//        weather_data.querySelector(" .details .w-speed").textContent = `Wind speed ${wind_speed}km/h`

//     } catch (error) {
//         weather_data.querySelector('.ico').innerHTML =""
//         weather_data.querySelector(".temp").textContent = ""
//         weather_data.querySelector(".clouds").textContent = `An error occured...`
//         weather_data.querySelector(".details .Humidity").textContent =""
//         weather_data.querySelector(" .details .w-speed").textContent = ""
//     }
   
// }

const apiKey = "d347d35b6f3ecab8e5037ad29b23872c"; 

const inputElement = document.getElementById("js-input");
const form = document.querySelector("form");
const weather_data = document.getElementById('content');
const weather_details = document.getElementById('details');
const aqi_data = document.querySelector('.aqi');
const icon = document.querySelector(".ico");
const aqi_quote = document.querySelector('.aqi-quote');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = inputElement.value;
    getWeather(inputValue);
    inputElement.value = "";
});

async function getWeather(inputValue) {
    try {
        // Fetch weather data
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`);
        
        if (!weatherResponse.ok) {
            throw new Error("Unable to fetch weather data");
        } 
        
        const weatherData = await weatherResponse.json();
        console.log("Weather Data:", weatherData);
        
        // Display weather data
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const main = weatherData.weather[0].main;
        const humidity = weatherData.main.humidity;
        const wind_speed = weatherData.wind.speed;

        if (main === "Clouds") {
            icon.innerHTML = `<img src="image/clouds.png">`;
        } else if (main === "Clear") {
            icon.innerHTML = `<img src="image/clear.png">`;
        } else if (main === "Mist") {
            icon.innerHTML = `<img src="image/mist.png">`;
        } else if (main === "Rain") {
            icon.innerHTML = `<img src="image/rain.png">`;
        } else if (main === "Drizzle") {
            icon.innerHTML = `<img src="image/drizzle.png">`;
        }

        weather_data.querySelector(".temp").textContent = `${temp}°C`;
        weather_data.querySelector(".clouds").textContent = `${description}`;
        weather_data.querySelector(".details .Humidity").textContent = `Humidity: ${humidity}%`;
        weather_data.querySelector(".details .w-speed").textContent = `Wind speed: ${wind_speed} km/h`;

        // Fetch AQI data
        await getAQI(weatherData.coord.lat, weatherData.coord.lon);

    } catch (error) {
        console.error("Error fetching data:", error);
        weather_data.querySelector('.ico').innerHTML = "";
        weather_data.querySelector(".temp").textContent = "";
        weather_data.querySelector(".clouds").textContent = `An error occurred...`;
        weather_data.querySelector(".details .Humidity").textContent = "";
        weather_data.querySelector(".details .w-speed").textContent = "";
        weather_data.querySelector(".details .aqi").textContent = "";
    }
}


async function getAQI(lat, lon) {
    try {
        const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        if (!aqiResponse.ok) {
            throw new Error("Unable to fetch AQI data");
        }

        const aqiData = await aqiResponse.json();
        console.log("AQI Data:", aqiData);

        const aqiIndex = aqiData.list[0].main.aqi; // AQI index
        weather_data.querySelector(".details .aqi").textContent = `AQI: ${aqiIndex}`;

         //   aqi display msg 
         if(aqiIndex === 1) {
            weather_data.querySelector(".details .api").textContent  = `Air quality is excellent! Enjoy the fresh air. No need for a mask.`;
            // weather_data.querySelector(" .aqi_Details  .aqi_precaution").textContent  = `No precautions needed.`;
           } else if(aqiIndex === 2) {
            weather_data.querySelector(".details .aqi").textContent  = `Air quality is Fair.`;
            weather_data.querySelector(".details .aqi_precaution").textContent  = `Sensitive individuals (e.g., those with asthma) should limit prolonged outdoor exertion.`;
           } else if(aqiIndex === 3) {
            weather_data.querySelector(".details .aqi").textContent  = `Moderate air quality.`;
            weather_data.querySelector(".details .aqi_precaution").textContent  = `Sensitive groups should consider limiting outdoor activities, especially if symptoms arise.`;
           } else if(aqiIndex === 4) {
            weather_data.querySelector(".details .aqi").textContent = `Air quality is poor.`;
            weather_data.querySelector(".details .aqi_precaution").textContent  = `Avoid prolonged outdoor exertion; wear a mask if needed, and keep windows closed.`;
           } else if(aqiIndex === 5) {
            weather_data.querySelector(".details aqi").textContent  = `Air quality is hazardous.`;
            weather_data.querySelector(".details .aqi_precaution").textContent  = ` Remain indoors, use an air purifier if available, and avoid physical activities outside.`;
           } else {
            weather_data.querySelector(".details aqi").textContent  = `Air quality is hazardous.`;
            weather_data.querySelector(".details .aqi_precaution").textContent  = `Remain indoors, use an air purifier if available, and avoid physical activities outside.`;
           }

    } catch (error) {
        console.error("Error fetching AQI data:", error);
        weather_data.querySelector(".details .aqi").textContent = "AQI data unavailable";
    }
}
