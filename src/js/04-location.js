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

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`;

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
      <th>Index</th>
      <td>${postcode}</td>
    </tr>
    <tr>
      <th>Country</th>
      <td>${country}</td>
    </tr>
    <tr>
      <th>Country code</th>
      <td>${country_code}</td>
    </tr>
    <tr>
      <th>House number</th>
      <td>${house_number}</td>
    </tr>
    <tr>
      <th>Road</th>
      <td>${road}</td>
    </tr>
    <tr>
      <th>Borough</th>
      <td>${borough}</td>
    </tr>
    <tr>
      <th>City</th>
      <td>${city}</td>
    </tr>
    <tr>
      <th>Municipality</th>
      <td>${municipality}</td>
    </tr>
    <tr>
      <th>district</th>
      <td>${district}</td>
    </tr>
    <tr>
      <th>State</th>
      <td>${state}</td>
    </tr>
  </table>`;
}
