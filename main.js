const apiKey = '3329ee16dde44cc7988143613242509';
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    const html = `<div class="card">${errorMessage}</div>`
    header.insertAdjacentHTML('afterend', html);
}

function showCard(cardDetails) {
    const { name, country, temperature, condition } = cardDetails
    // Отображаем полученные данные в карточку
    //Разметка для карточки
    const html = `<div class="card">
        <div class="card-city">${name} <span>${country}</span></div>
        <div class="card-weather">
            <div class="card-value">${temperature}<sup>°c</sup></div>
            <img class="card-img" src="./img/example.png" alt="Weather">
        </div>
        <div class="card-description">${condition}</div>
    </div>`;
    //Отображаем карточку на странице
    header.insertAdjacentHTML('afterend', html);
}



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

        console.log('fetch');

        //Проверка на ошибку
        if (data.error) {
            removeCard();
            showError(data.error.message);
        } else {
            const cardDetails = {
                name: data.location.name,
                country: data.location.country,
                temperature: data.current.temp_c,
                condition: data.current.condition.text
            }
            removeCard();
            showCard(cardDetails);
        }
    })
}
