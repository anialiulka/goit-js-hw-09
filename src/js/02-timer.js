import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStartEl = document.querySelector('button[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
const inputFormEL = document.querySelector('#datetime-picker');

buttonStartEl.disabled = true;

let currentTime = null;

setInterval(getCurrentTime, 1000);

function getCurrentTime() {
  currentTime = new Date().getTime();
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentTime) {
      Notify.info('Please choose a date in the future');
      if (!buttonStartEl.disabled) {
        buttonStartEl.disabled = true;
      }
    } else {
      buttonStartEl.disabled = false;
      buttonStartEl.addEventListener('click', onStartButtonCLick);
    }
  },
};

const countdownTimer = flatpickr('#datetime-picker', options);

function onStartButtonCLick() {
  const selectedDate = countdownTimer.selectedDates[0];
  const timerId = setInterval(() => {
    const remainingTime = selectedDate.getTime() - currentTime;
    buttonStartEl.disabled = true;
    inputFormEL.disabled = true;
    if (remainingTime > 0) {
      updateDisplay(remainingTime);
    } else {
      clearInterval(timerId);
      updateDisplay(0);
      inputFormEL.disabled = false;
    }
  }, 1000);
}

function updateDisplay(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  addLeadingZero(days, hours, minutes, seconds);
}

function convertMs(ms) {
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

function addLeadingZero(days, hours, minutes, seconds) {
  daysField.textContent = `${days.toString().padStart(2, '0')}`;
  hoursField.textContent = `${hours.toString().padStart(2, '0')}`;
  minutesField.textContent = `${minutes.toString().padStart(2, '0')}`;
  secondsField.textContent = `${seconds.toString().padStart(2, '0')}`;
}
