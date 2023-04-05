const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");
const alarmSound = document.getElementById("alarm-sound");

let totalTime = 1500; // 25 minutes in seconds
let remainingTime = totalTime;
let intervalId;

function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    remainingTime--;
    updateTimer();
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startPauseTimer();
      playSound();
    }
  }, 1000);
  document.body.classList.remove("active-5");
  document.body.classList.add("active-25");
}

function startPauseTimer() {
  totalTime = 300; // 5 minutes in seconds
  remainingTime = totalTime;
  updateTimer();
  intervalId = setInterval(() => {
    remainingTime--;
    updateTimer();
    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startTimer();
      playSound();
    }
  }, 1000);
  document.body.classList.remove("active-25");
  document.body.classList.add("active-5");
}

function stopTimer() {
  clearInterval(intervalId);
  document.body.classList.remove("active-25");
  document.body.classList.remove("active-5");
  playSound();
}

function resetTimer() {
  totalTime = 1500; // 25 minutes in seconds
  remainingTime = totalTime;
  updateTimer();
  document.body.classList.remove("active-25");
  document.body.classList.remove("active-5");
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function updateTimer() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  minutesSpan.textContent = padNumber(minutes);
  secondsSpan.textContent = padNumber(seconds);
}

function padNumber(number) {
  return number.toString().padStart(2, "0");
}

function playSound() {
  alarmSound.play();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateTimer(); // Set initial time display
