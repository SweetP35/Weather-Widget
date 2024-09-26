const apiKey = '3329ee16dde44cc7988143613242509';
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');



// Слушаем отправку формы

form.onsubmit = function (e) {
    // Отмена отправки формы
    e.preventDefault();
    // Берем значение из инпута, обрезаем пробелы
    let city = input.value.trim();

    // Делаем запрос на сервер
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        console.log(data.location.name);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);

        // Отображаем полученные данные в карточку
        //Разметка для карточки
        const html = `<div class="card">
        <div class="card-city">${data.location.name} <span>${data.location.country}</span></div>
        <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img class="card-img" src="./img/example.png" alt="Weather">
        </div>
        <div class="card-description">${data.current.condition.text}</div>
    </div>`
        //Отображаем карточку на странице
        header.insertAdjacentHTML('afterend', html)
    })
}