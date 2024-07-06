import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const calendarSelector = document.getElementById("datetime-picker");
const btn = document.getElementById("main-btn");
const timerDisplay = document.querySelector("body > div.timer")

let userSelectedDate;

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

function updateTimer() {
  const now = new Date();
  if (!userSelectedDate) {
    console.error("User selected date is not defined.");
    return;
  }
  const timeDifference = userSelectedDate.getTime() - now.getTime();
  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    timerDisplay.textContent = "00:00:00:00";
    console.log("Countdown finished!");
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  const formattedDays = String(days).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  timerDisplay.textContent = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

btn.addEventListener("click", () => {
  const now = new Date();
  if (!userSelectedDate) {
    console.error("User selected date is not defined.");
    return;
  }
  const timeDifference = userSelectedDate.getTime() - now.getTime();

  function updateTimer() {
    const now = new Date();
    if (!userSelectedDate) {
      console.error("User selected date is not defined.");
      return;
    }
    const timeLeft = userSelectedDate.getTime() - now.getTime();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      iziToast.show({
        message: "Countdown finished!"
      });;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    const formattedDays = String(days).padStart(2, "0");
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    timerDisplay.textContent = `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate > new Date()) {
      btn.disabled = false;
    } else {
      iziToast.show({
        message: "Please choose a date in the future"
      });;
      btn.disabled = true;
    }
  },
});