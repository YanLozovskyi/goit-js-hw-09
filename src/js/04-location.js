const button = document.querySelector('.location');

button.addEventListener('click', getLocation);

function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.table(data.address);
      })
      .catch(() => {
        console.log('Error fetching data from API');
      });
  });
}
