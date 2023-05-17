import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataInputEl = document.getElementById('datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');
const timerEl = document.querySelector('.timer');

const refs = {
  days: timerEl.querySelector('[data-days]'),
  hours: timerEl.querySelector('[data-hours]'),
  minutes: timerEl.querySelector('[data-minutes]'),
  seconds: timerEl.querySelector('[data-seconds]'),
};

let selectedDate;
let timerId = null;

buttonStartEl.setAttribute('disabled', '');

flatpickr(dataInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    statusOfSelectedDate();
  },
});

function statusOfSelectedDate() {
  if (selectedDate - new Date() < 0) {
    handleError('Please choose a date in the future');
    disableStartButton();
    return;
  }
  preStartSettings();
}

function handleError(errorMessage) {
  Notiflix.Notify.failure(errorMessage, {
    clickToClose: true,
  });
}

function disableStartButton() {
  buttonStartEl.setAttribute('disabled', '');
}

function enableStartButton() {
  buttonStartEl.removeAttribute('disabled');
}

function preStartSettings() {
  Notiflix.Notify.info(
    'The date is correct, you can start the timer by pressing the "Start" button',
    {
      clickToClose: true,
    }
  );
  buttonStartEl.addEventListener('click', onStartButtonClick);
  enableStartButton();
}

function onStartButtonClick() {
  Notiflix.Notify.success('timer is running', {
    clickToClose: true,
  });
  try {
    timerId = setInterval(updateTimer, 4);
    dataInputEl.setAttribute('disabled', '');
    buttonStartEl.textContent = 'Reset';

    buttonStartEl.removeEventListener('click', onStartButtonClick);
    buttonStartEl.addEventListener('click', onResetButtonClick);
  } catch (error) {
    handleError('An error occurred while starting the timer');
  }
}

function onResetButtonClick() {
  Notiflix.Notify.info('The timer is cleared, you can choose a new date', {
    clickToClose: true,
  });
  try {
    clearInterval(timerId);

    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';

    dataInputEl.removeAttribute('disabled');
    buttonStartEl.textContent = 'Start';
    disableStartButton();

    buttonStartEl.removeEventListener('click', onResetButtonClick);
  } catch (error) {
    handleError('An error occurred while resetting the timer');
  }
}

function updateTimer() {
  try {
    const { days, hours, minutes, seconds } = convertMs(
      selectedDate - new Date()
    );
    const difference = selectedDate - new Date() < 0;
    if (difference) {
      onResetButtonClick();
      return;
    }
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  } catch (error) {
    handleError('An error occurred while updating the timer');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
