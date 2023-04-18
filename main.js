const apiKey = "e9a5d3b74bf84418b11193028231901";

let form = document.querySelector("#Form");
let inputForm = document.querySelector("#inputForm");
let mainContainer = document.querySelector("main");

// Очистка контейнера
const clearCard = () => {
  mainContainer.innerHTML = "";
};

const showError = (errorMessage) => {
  // Отобразить карточку с ошибкой
  const html = `<div class="card">${errorMessage}</div>`;

  // Отображаем карточку на странице
  mainContainer.append(html);
};

// Получение данных
const getWeather = async (city) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Показать карточку
const showCard = ({ name, country, temp, condition }) => {
  // Разметка для карточки
  const html = `
      <div class="card">
        <h2 class="card-city">${name} <span>${country}</span>
        </h2>
        <div class="card-weather">
          <div class="card-value">${temp}<sup>°c</sup>
          </div>
          <img class="card-img" src="img/icon/cloudy.png" alt="" />
        </div>
        <div class="card-discription">${condition}</div>
      </div>`;

  // Отображаем карточку на странице
  mainContainer.innerHTML = html;
};

// Слушаем отправку формы
form.addEventListener("submit", async (e) => {
  // Отменяем отправку формы
  e.preventDefault();

  // Берем значение из инпута, обрезаем пробелы
  let city = inputForm.value;

  // Получаем данные с сервера
  const data = await getWeather(city);

  if (data.error) {
    clearCard();
    showError(data.error.message);
  } else {
    clearCard();
    console.log(data);

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };

    showCard(weatherData);
  }

  inputForm.value = "";
});
