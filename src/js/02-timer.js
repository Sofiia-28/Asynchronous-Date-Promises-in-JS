import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Refs
const inputEl = document.getElementById('datetime-picker');
const daysNumber = document.querySelector('span[data-days]');
const hoursNumber = document.querySelector('span[data-hours]');
const minutesNumber = document.querySelector('span[data-minutes]');
const secondsNumber = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
let timerId = null;
let currentDate = new Date();
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.addAttribute('disabled', '');
    }
    startBtn.removeAttribute('disabled', '');
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputEl, options);

startBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', startCountTime);
function startCountTime(event) {
  timerId = setInterval(() => {
    startBtn.setAttribute('disabled', '');
    currentDate = new Date();
    const timeDifferenceMs = selectedDate.getTime() - currentDate.getTime();
    console.log(currentDate);
    const timeDifference = convertMs(timeDifferenceMs);
    const { days, hours, minutes, seconds } = timeDifference;
    daysNumber.textContent = days.toString().padStart(2, '0');
    hoursNumber.textContent = hours.toString().padStart(2, '0');
    minutesNumber.textContent = minutes.toString().padStart(2, '0');
    secondsNumber.textContent = seconds.toString().padStart(2, '0');

    setTimeout(() => {
      clearInterval(timerId);
    }, timeDifferenceMs);
  }, 1000);
}
