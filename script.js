
const apiKey = "d347d35b6f3ecab8e5037ad29b23872c";

const inputElement = document.getElementById("js-input")
const form = document.querySelector("form")
const weather_data = document.getElementById('content')
const weather_details = document.getElementById('details')
const icon = document.querySelector(".ico")

form.addEventListener('submit', (event) => {
 event.preventDefault()
 const inputValue = inputElement.value
 getWeather(inputValue)
 inputElement.value = ""
})

async function getWeather(inputValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metrics
        `)

        if(!response.ok){
            throw new Error("Network response was not ok")
        }

        const data = await response.json()
        console.log(data)

       const temp = Math.round(data.main.temp)
       const description = data.weather[0].description
       const main = data.weather[0].main;
       const humidity = data.main.humidity
       const wind_speed = data.wind.speed;

    //    weather_data.querySelector('.ico').innerHTML =`<img src="http://openweathermap.org/img/wn/${image}.png" alt="weather icon"/>`

    if(main == "Clouds"){
        icon.innerHTML = `<img src = "image/clouds.png">`
     }else if(main == "Clear"){
        icon.innerHTML = `<img src = "image/clear.png">`
     }else if(main == "Mist"){
        icon.innerHTML = `<img src = "image/mist.png">`
     }else if(main == "Rain"){
        icon.innerHTML = `<img src = "image/rain.png">`
     }else if(main == "Drizzle"){
        icon.innerHTML = `<img src = "image/drizzle.png">`
     }
       weather_data.querySelector(".temp").textContent = `${temp}°c`
       weather_data.querySelector(".clouds").textContent = `${description}`
       weather_data.querySelector(".details .Humidity").textContent = `Humidity ${humidity}`
       weather_data.querySelector(" .details .w-speed").textContent = `Wind speed ${wind_speed}km/h`

    } catch (error) {
        weather_data.querySelector('.ico').innerHTML =""
        weather_data.querySelector(".temp").textContent = ""
        weather_data.querySelector(".clouds").textContent = `An error occured...`
        weather_data.querySelector(".details .Humidity").textContent =""
        weather_data.querySelector(" .details .w-speed").textContent = ""
    }
   
}
