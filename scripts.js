let countdown;
const timeDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

// All the buttons
const timerButtons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    // Calculate elapsed time once per second.
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/60);
    const secondsLeft = seconds % 60;
    const secondsPrefix = secondsLeft < 10 ? '0' : '';
    const display = `${minutes}:${secondsPrefix}${secondsLeft}`;
    timeDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    let hours = end.getHours();
    if (hours > 12) hours -= 12;
    const minutes = end.getMinutes();
    const minutesPrefix = minutes < 10 ? '0' : '';
    endTime.textContent = `Be back at ${hours}:${minutesPrefix}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

timerButtons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})