// Get HTML elements
const breakLabel = document.getElementById("break-label");
const sessionLabel = document.getElementById("session-label");
const breakDecrement = document.getElementById("break-decrement");
const breakIncrement = document.getElementById("break-increment");
const sessionDecrement = document.getElementById("session-decrement");
const sessionIncrement = document.getElementById("session-increment");
const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const timerLabel = document.getElementById("timer-label");
const timeLeft = document.getElementById("time-left");
const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");
const beep = document.getElementById("beep");

// Set initial values
let breakLengthValue = 5;
let sessionLengthValue = 25;
let isSession = true;
let isRunning = false;
let timeRemaining = sessionLengthValue * 60;
let timerInterval;

// Functions to update values
function updateBreakLength(value) {
  breakLengthValue = Math.min(60, Math.max(1, breakLengthValue + value));
  breakLength.textContent = breakLengthValue;
}

function updateSessionLength(value) {
  sessionLengthValue = Math.min(60, Math.max(1, sessionLengthValue + value));
  sessionLength.textContent = sessionLengthValue;
  timeRemaining = sessionLengthValue * 60;
  updateTimeLeftDisplay();
}

// Functions to handle timer
function startTimer() {
  isRunning = true;
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimeLeftDisplay();
    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      beep.play();
      if (isSession) {
        isSession = false;
        timerLabel.textContent = "Break";
        timeRemaining = breakLengthValue * 60;
      } else {
        isSession = true;
        timerLabel.textContent = "Session";
        timeRemaining = sessionLengthValue * 60;
      }
      setTimeout(startTimer, 1000);
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
}

function resetTimer() {
  isSession = true;
  isRunning = false;
  timeRemaining = sessionLengthValue * 60;
  clearInterval(timerInterval);
  timerLabel.textContent = "Session";
  updateTimeLeftDisplay();
  beep.pause();
  beep.currentTime = 0;
}

// Function to update time left display
function updateTimeLeftDisplay() {
  let minutes = Math.floor(timeRemaining / 60);
  let seconds = timeRemaining % 60;
  timeLeft.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Add event listeners
breakDecrement.addEventListener("click", () => updateBreakLength(-1));
breakIncrement.addEventListener("click", () => updateBreakLength(1));
sessionDecrement.addEventListener("click", () => updateSessionLength(-1));
sessionIncrement.addEventListener("click", () => updateSessionLength(1));
startStop.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});
reset.addEventListener("click", resetTimer);

// Initialize display
breakLength.textContent = breakLengthValue;
sessionLength.textContent = sessionLengthValue;
updateTimeLeftDisplay();
