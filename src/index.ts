import { city } from './city';
const blured = document.querySelector('#blur') as HTMLDivElement;
const popup = document.querySelector('#popup') as HTMLDivElement;
const currentLocation = document.querySelector('#current_location') as HTMLDivElement;
const search = document.querySelector('#search') as HTMLButtonElement;
const input = document.querySelector('#input') as HTMLInputElement;
const closeBtn = document.querySelector('#close') as HTMLButtonElement;
const celsius = document.querySelector('#celsius') as HTMLInputElement;
const fahrenheit = document.querySelector('#fahrenheit') as HTMLInputElement;
const Kelvin = document.querySelector('#Kelvin') as HTMLInputElement;
const overlay = document.querySelector('#overlay') as HTMLDetailsElement;
const suggesstions = document.querySelector('#suggesstions') as HTMLDataListElement;

celsius.addEventListener('click', (e) => {
    setItems(celsius.value);
});

fahrenheit.addEventListener('click', (e) => {
    setItems(fahrenheit.value);
});

Kelvin.addEventListener('click', (e) => {
    setItems(Kelvin.value);
});


const setItems = (value: string) => {
    localStorage.setItem('unit', value);
    popup.removeChild(document.querySelector('.place')!);
    popup.removeChild(document.querySelector('.temp')!);
    popup.removeChild(document.querySelector('.weather')!);
    weather();
    if (localStorage.getItem('lat')) {
        popup.removeChild(document.querySelector('.span')!);
        currentLocationWeather(parseInt(localStorage.getItem('lat')!), parseInt(localStorage.getItem('long')!))
    }
}


overlay.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    if (localStorage.getItem('long')) {
        localStorage.removeItem('long');
        localStorage.removeItem('lat');
    }
    window.location.href = './';
})

search.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    weather();
});


closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    if (localStorage.getItem('long')) {
        localStorage.removeItem('long');
        localStorage.removeItem('lat');
    }
    window.location.href = './';
});

currentLocation.addEventListener('click', (e) => {
    e.preventDefault();
    blured.classList.toggle('active');
    popup.classList.toggle('active');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            localStorage.setItem('lat', lat.toString());
            localStorage.setItem('long', long.toString())
            console.log(lat, long);

            currentLocationWeather(lat, long);
        }, error => {
            console.log('Need access to get location.');
            const span: HTMLSpanElement = document.createElement('span');
            span.className = 'span';
            span.innerHTML = 'Need access to get location.';
            span.style.color = 'red';
            popup.appendChild(span);
        });
    }
})

input.addEventListener('keyup', (e) => {
    e.preventDefault();
    removeElements();
    for (let i of city) {
        if (i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != "") {
            const options: HTMLOptionElement = document.createElement('option');
            options.className = 'option';
            options.textContent = i;
            suggesstions.appendChild(options);
            
        }
    }
});


const options = document.querySelector('.option') as HTMLOptionElement;
if (options != null) {
    console.log(options, "op");


}

input.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode == 13) {
        blured.classList.toggle('active');
        popup.classList.toggle('active');
        const options: HTMLOptionElement = document.querySelector('.option')!;
        if (options != null) {
            suggesstions.removeChild(options);
        }
        weather();
    }
});



const removeElements = () => {
    const items = document.querySelectorAll('.option');
    items.forEach(item => item.remove());

}

const weather = async () => {
    if (input.value) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${process.env.API_KEY}`);
        const data = await response.json();
        if (data.cod == 404) {
            const span: HTMLSpanElement = document.createElement('span');
            span.className = 'span';
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
        const span: HTMLSpanElement = document.createElement('span');
        span.className = 'span';
        span.innerHTML = 'please enter any city';
        span.style.color = 'red';
        popup.appendChild(span);
    }
}

const currentLocationWeather = async (lat: number, long: number) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.API_KEY}`);
    const data = await response.json();

    if (data.cod == 404) {
        const span: HTMLDivElement = document.createElement('div');
        span.className = 'span';
        span.innerHTML = 'Not matches';
        span.style.color = 'red';
        popup.appendChild(span);
    }
    else {
        setImage(data.weather[0].main);
        setContent(data);
    }
}

const setImage = (currentWeather: string) => {
    let image = "";
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
        default: {
            image = "url('./images/clear.jpg')";
        }
    }
    popup.style.backgroundImage = image;
}



const setContent = (data: any) => {
    const place: HTMLDivElement = document.createElement('div');
    place.className = 'place';
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    popup.appendChild(place);

    const temp: HTMLDivElement = document.createElement('div');
    temp.className = 'temp'
    temp.innerHTML = setTemperature(data);
    popup.appendChild(temp);

    const weather: HTMLDivElement = document.createElement('div');
    weather.className = 'weather';
    weather.innerHTML = `${data.weather[0].main} `;
    popup.appendChild(weather);

}
const setTemperature = (data: any) => {
    const value = localStorage.getItem('unit');
    let temp = '';
    switch (value) {
        case "Kelvin": {
            temp = `Temp = ${data.main.temp}, Min = ${data.main.temp_min}, Max = ${data.main.temp_max} `;
            break;

        }
        case "fahrenheit": {
            temp = `Temp = ${Math.round((data.main.temp - 457.87) * 10) / 10}, Min = ${Math.round((data.main.temp_min - 457.87) * 10) / 10}, Max = ${Math.round((data.main.temp_max - 457.87) * 10) / 10} `;
            break;

        }
        default: {
            temp = `Temp = ${Math.round((data.main.temp - 273.15) * 10) / 10}, Min = ${Math.round((data.main.temp_min - 273.15) * 10) / 10}, Max = ${Math.round((data.main.temp_max - 273.15) * 10) / 10} `;
        }
    }
    return temp;
}


// { "coord": { "lon": 77.7, "lat": 28.9833 }, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "base": "stations", "main": { "temp": 304.22, "feels_like": 309.47, "temp_min": 304.22, "temp_max": 304.22, "pressure": 999, "humidity": 65, "sea_level": 999, "grnd_level": 974 }, "visibility": 10000, "wind": { "speed": 6.19, "deg": 123, "gust": 7.14 }, "rain": { "1h": 0.77 }, "clouds": { "all": 100 }, "dt": 1656572344, "sys": { "country": "IN", "sunrise": 1656546809, "sunset": 1656597109 }, "timezone": 19800, "id": 1263214, "name": "Meerut", "cod": 200 }