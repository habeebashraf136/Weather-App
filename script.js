const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "390cc5b002194fb3abc93404252110";
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    console.log(weather_data)
    if(!weather_data.location){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        // console.log("error");
        return;
    }

    ;
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.current.temp_c)}°C`;
    description.innerHTML = `${weather_data.current.condition.text}`;
    // description.innerHTML = `${weather_data.current.description}`;

    humidity.innerHTML = `${weather_data.current.humidity}%`;
    wind_speed.innerHTML = `${weather_data.current.wind_kph}Km/H`;
    console.log("code run");


    switch(weather_data.current.condition.text){
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const city = inputBox.value.trim();
        if (city) {
            checkWeather(inputBox.value);
        }
    }
});