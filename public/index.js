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
console.log(document);
const blured = document.querySelector('#blur');
const popup = document.querySelector('#popup');
const search = document.querySelector('#search');
const input = document.querySelector('#input');
const closeBtn = document.querySelector('#close');
search.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    weather.api();
});
closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    window.location.href = './index.html';
});
let weather = {
    "apiKey": '4eaa52706c47734ce0b08f4fb3192c63',
    "api": function () {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(input.value);
            if (input.value) {
                const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=4eaa52706c47734ce0b08f4fb3192c63`);
                const data = yield response.json();
                if (data.cod == 404) {
                    const span = document.createElement('div');
                    console.log("bgygyf");
                    span.innerHTML = 'Not matches';
                    span.style.color = 'red';
                    popup.appendChild(span);
                }
                else {
                    setImage(data.weather[0].main);
                    setContent(data);
                }
            }
            else {
                const span = document.createElement('span');
                span.innerHTML = 'please enter any city';
                span.style.color = 'red';
                popup.appendChild(span);
            }
        });
    }
};
const setImage = (currentWeather) => {
    let image = "";
    console.log(currentWeather);
    switch (currentWeather) {
        case "Rain": {
            image = " url('./images/rainy.jpg')";
            break;
        }
        case "Clouds": {
            image = "url('./images/clouds.webp')";
            break;
        }
        case "Clear": {
            image = "url('./images/clear.jpg')";
            break;
        }
    }
    popup.style.backgroundImage = image;
};
const setContent = (data) => {
    const place = document.createElement('div');
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    popup.appendChild(place);
    const temp = document.createElement('div');
    temp.innerHTML = `Temp = ${Math.round((data.main.temp - 273.15) * 10) / 10}, Min = ${Math.round((data.main.temp_min - 273.15) * 10) / 10}, Max = ${Math.round((data.main.temp_max - 273.15) * 10) / 10} `;
    popup.appendChild(temp);
    const weather = document.createElement('div');
    weather.innerHTML = `${data.weather[0].main} `;
    popup.appendChild(weather);
};
// { "coord": { "lon": 77.7, "lat": 28.9833 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "base": "stations", "main": { "temp": 304.22, "feels_like": 309.47, "temp_min": 304.22, "temp_max": 304.22, "pressure": 999, "humidity": 65, "sea_level": 999, "grnd_level": 974 }, "visibility": 10000, "wind": { "speed": 6.19, "deg": 123, "gust": 7.14 }, "rain": { "1h": 0.77 }, "clouds": { "all": 100 }, "dt": 1656572344, "sys": { "country": "IN", "sunrise": 1656546809, "sunset": 1656597109 }, "timezone": 19800, "id": 1263214, "name": "Meerut", "cod": 200 }
