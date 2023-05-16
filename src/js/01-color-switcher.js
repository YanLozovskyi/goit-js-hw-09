const refs = {
  buttonStartEl: document.querySelector('button[data-start]'),
  buttonStopEl: document.querySelector('button[data-stop]'),
  bodyEl: document.body,
};

let timerId = null;

refs.buttonStartEl.addEventListener('click', startColorSwitching);
refs.buttonStopEl.addEventListener('click', stopColorSwitching);

refs.buttonStopEl.setAttribute('disabled', '');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function startColorSwitching() {
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = randomColor;
  }, 1000);

  refs.buttonStartEl.setAttribute('disabled', '');
  refs.buttonStopEl.removeAttribute('disabled');
}

function stopColorSwitching() {
  clearInterval(timerId);
  refs.buttonStopEl.setAttribute('disabled', '');
  refs.buttonStartEl.removeAttribute('disabled');
}
