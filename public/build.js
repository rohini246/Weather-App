/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function() {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nconst blured = document.querySelector('#blur');\r\nconst popup = document.querySelector('#popup');\r\nconst currentLocation = document.querySelector('#current_location');\r\nconst search = document.querySelector('#search');\r\nconst input = document.querySelector('#input');\r\nconst closeBtn = document.querySelector('#close');\r\nsearch.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    blured.classList.toggle('active');\r\n    popup.classList.toggle('active');\r\n    weather.api();\r\n});\r\ncloseBtn.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    blured.classList.toggle('active');\r\n    popup.classList.toggle('active');\r\n    window.location.href = './';\r\n});\r\ncurrentLocation.addEventListener('click', (e) => {\r\n    e.preventDefault();\r\n    blured.classList.toggle('active');\r\n    popup.classList.toggle('active');\r\n    if (navigator.geolocation) {\r\n        navigator.geolocation.getCurrentPosition(position => {\r\n            const lat = position.coords.latitude;\r\n            const long = position.coords.longitude;\r\n            currentLocationWeather.api(lat, long);\r\n        }, error => {\r\n            console.log('Need access to get location.');\r\n        });\r\n    }\r\n});\r\nlet weather = {\r\n    \"api\": function () {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            console.log(input.value);\r\n            if (input.value) {\r\n                const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${\"4eaa52706c47734ce0b08f4fb3192c63\"}`);\r\n                const data = yield response.json();\r\n                if (data.cod == 404) {\r\n                    const span = document.createElement('div');\r\n                    span.innerHTML = 'Not matches';\r\n                    span.style.color = 'red';\r\n                    popup.appendChild(span);\r\n                }\r\n                else {\r\n                    setImage(data.weather[0].main);\r\n                    setContent(data);\r\n                }\r\n            }\r\n            else {\r\n                const span = document.createElement('span');\r\n                span.innerHTML = 'please enter any city';\r\n                span.style.color = 'red';\r\n                popup.appendChild(span);\r\n            }\r\n        });\r\n    }\r\n};\r\nlet currentLocationWeather = {\r\n    \"api\": function (lat, long) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${\"4eaa52706c47734ce0b08f4fb3192c63\"}`);\r\n            const data = yield response.json();\r\n            if (data.cod == 404) {\r\n                const span = document.createElement('div');\r\n                console.log(\"bgygyf\");\r\n                span.innerHTML = 'Not matches';\r\n                span.style.color = 'red';\r\n                popup.appendChild(span);\r\n            }\r\n            else {\r\n                setImage(data.weather[0].main);\r\n                setContent(data);\r\n            }\r\n        });\r\n    }\r\n};\r\nconst setImage = (currentWeather) => {\r\n    let image = \"\";\r\n    console.log(currentWeather);\r\n    switch (currentWeather) {\r\n        case \"Rain\": {\r\n            image = \" url('./images/rainy.jpg')\";\r\n            break;\r\n        }\r\n        case \"Clouds\": {\r\n            image = \"url('./images/clouds.webp')\";\r\n            break;\r\n        }\r\n        case \"Clear\": {\r\n            image = \"url('./images/clear.jpg')\";\r\n            break;\r\n        }\r\n    }\r\n    popup.style.backgroundImage = image;\r\n};\r\nconst setContent = (data) => {\r\n    const place = document.createElement('div');\r\n    place.innerHTML = `${data.name}, ${data.sys.country}`;\r\n    popup.appendChild(place);\r\n    const temp = document.createElement('div');\r\n    temp.innerHTML = `Temp = ${Math.round((data.main.temp - 273.15) * 10) / 10}, Min = ${Math.round((data.main.temp_min - 273.15) * 10) / 10}, Max = ${Math.round((data.main.temp_max - 273.15) * 10) / 10} `;\r\n    popup.appendChild(temp);\r\n    const weather = document.createElement('div');\r\n    weather.innerHTML = `${data.weather[0].main} `;\r\n    popup.appendChild(weather);\r\n};\r\n// { \"coord\": { \"lon\": 77.7, \"lat\": 28.9833 }, \"weather\": [{ \"id\": 500, \"main\": \"Rain\", \"description\": \"light rain\", \"icon\": \"10d\" }], \"base\": \"stations\", \"main\": { \"temp\": 304.22, \"feels_like\": 309.47, \"temp_min\": 304.22, \"temp_max\": 304.22, \"pressure\": 999, \"humidity\": 65, \"sea_level\": 999, \"grnd_level\": 974 }, \"visibility\": 10000, \"wind\": { \"speed\": 6.19, \"deg\": 123, \"gust\": 7.14 }, \"rain\": { \"1h\": 0.77 }, \"clouds\": { \"all\": 100 }, \"dt\": 1656572344, \"sys\": { \"country\": \"IN\", \"sunrise\": 1656546809, \"sunset\": 1656597109 }, \"timezone\": 19800, \"id\": 1263214, \"name\": \"Meerut\", \"cod\": 200 }\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;