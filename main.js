var celsius = false,
    kelTemp,
    lat,
    lon,
    farTemp,
    celTemp,
    appId = '3b48ce3ba2169dcf1d32c9df341f039d',
    buttonTemp = document.querySelector('.toggleTemperature'),
    getWeatherButton = document.querySelector('.getWeather'),
    options = {
        cache: 'no-cache'
    };

getUserCoords();

getWeatherButton.addEventListener('click', () => {
    getWeatherFromApi();
});

buttonTemp.addEventListener('click', () => {
    celsius = !celsius;
    toggleTemperature();
});

async function getWeatherFromApi () {
    try {
        var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
        var response = await fetch(weatherUrl, options);
        var weather = await response.json();
        setTemperature(weather)
        placeDataInTheDom(weather);
        getBackgroundImage();
    } catch (e) {
        console.log('Can not load weather, try again later');
    }
}

function setTemperature (data) {
    kelTemp = data.main.temp;
    farTemp = Math.round(kelTemp * 1.8 - 459.67);
    celTemp = Math.round(kelTemp - 273.15);
}

// TEMP: отображаем данные в DOM
function placeDataInTheDom (data) {
    document.querySelector('.country').textContent = data.sys.country;
    document.querySelector('.city').textContent = data.name;
    document.querySelector('.temperature').textContent = farTemp + 'F';
    document.querySelector('.description').textContent = data.weather[0].description;
}

// TEMP: переключаем температуру с F на C и обратно
function toggleTemperature(){
    if(celTemp != undefined) {
        if (celsius) {
            document.querySelector('.temperature').textContent = celTemp + 'C';
            document.querySelector('.toggleTemperature').textContent = 'C -> F';
        } else {
            document.querySelector('.temperature').textContent = farTemp + 'F';
            document.querySelector('.toggleTemperature').textContent = 'F -> C';
        }
    }

}

// TEMP: получаем координаты пользователя
function getUserCoords(){
    navigator.geolocation.getCurrentPosition(success, errorLoading);

    function success(position){
        lat = position.coords.latitude;
        lon = position.coords.longitude;
    }

    function errorLoading(){
        console.log('Can not load your location.');
    }
}

// TEMP: Рисуем изображение взависимости от температуры
function getBackgroundImage(){
    if (celTemp >= 0 && celTemp <= 20) {
        document.body.style.backgroundImage = 'url(\'https://images.pexels.com/photos/200431/pexels-photo-200431.jpeg\')';
    } else if (celTemp < 0) {
        document.body.style.backgroundImage = 'url(\'https://images.pexels.com/photos/70234/pexels-photo-70234.jpeg\')';
    } else if (celTemp > 20) {
        document.body.style.backgroundImage = 'url(\'https://images.pexels.com/photos/134695/pexels-photo-134695.jpeg\')';
    }
}