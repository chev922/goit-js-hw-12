import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
let timerInterval = null;
const button = document.querySelector("button");
const calendarElement = document.querySelector("#datetime-picker");
const spanText = document.querySelectorAll(".value");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        userSelectedDate = selectedDate;

        if (selectedDate && selectedDate.getTime() > new Date().getTime()) {
            button.disabled = false;
        } else {
            button.disabled = true;
            calendarElement.disabled = false;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'center',
            });
        }
    },
};

flatpickr(calendarElement, options);

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

button.addEventListener('click', (event) => {
    event.preventDefault();

    if (timerInterval) clearInterval(timerInterval);
    calendarElement.disabled = true;
    button.disabled = true;

    timerInterval = setInterval(() => {
        const now = new Date();
        const diff = userSelectedDate - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            spanText.forEach(span => span.textContent = '00');
            calendarElement.disabled = false;
        } else {
            const { days, hours, minutes, seconds } = convertMs(diff);
            spanText[0].textContent = days.toString().padStart(2, '0');
            spanText[1].textContent = hours.toString().padStart(2, '0');
            spanText[2].textContent = minutes.toString().padStart(2, '0');
            spanText[3].textContent = seconds.toString().padStart(2, '0');
        }
    }, 1000);
});