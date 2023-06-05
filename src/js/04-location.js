const button = document.querySelector('.location');
const tableEl = document.querySelector('.table-container');
const textEl = document.querySelector('.text');
const dealBtnEl = document.querySelector('.deal');

button.addEventListener('click', getLocation);
dealBtnEl.addEventListener('click', amnesty);

function amnesty() {
  button.classList.add('is-hidden');
  dealBtnEl.classList.add('is-hidden');
  textEl.innerHTML =
    'Що ж ви мовчали про застуду , тепер ви зняті з військового обліку, всього найкращого!';
  tableEl.innerHTML = '';
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.table(data.address);
        dealBtnEl.classList.remove('is-hidden');
        textEl.textContent = 'Здравия желаю! Ожидайте повестку по адрессу:';
        createMarkup(data.address);
      })
      .catch(error => {
        console.log(error);
        console.log('Error fetching data from API');
      });
  });
}

function createMarkup(data) {
  const {
    house_number,
    road,
    borough,
    city,
    municipality,
    district,
    state,
    postcode,
    country,
    country_code,
  } = data;

  tableEl.innerHTML = `
  <table>
    <tr>
      <th>Індекс</th>
      <td>${postcode}</td>
    </tr>
    <tr>
      <th>Країна</th>
      <td>${country}</td>
    </tr>
    <tr>
      <th>Код країни</th>
      <td>${country_code}</td>
    </tr>
    <tr>
      <th>Номер будинку</th>
      <td>${house_number}</td>
    </tr>
    <tr>
      <th>Вулиця</th>
      <td>${road}</td>
    </tr>
    <tr>
      <th>Район</th>
      <td>${borough}</td>
    </tr>
    <tr>
      <th>Місто</th>
      <td>${city}</td>
    </tr>
    <tr>
      <th>Муніципалітет</th>
      <td>${municipality}</td>
    </tr>
    <tr>
      <th>Район міста</th>
      <td>${district}</td>
    </tr>
    <tr>
      <th>Область</th>
      <td>${state}</td>
    </tr>
  </table>`;
}
