let date, calendarIcon, calendar, datePicker, days, selectButton, monthYearDisplay;

date = document.getElementById('date');
calendarIcon = document.getElementById('calendar-icon');
calendar = document.getElementById('calendar');
datePicker = document.getElementById('date-picker');
days = document.querySelectorAll('.calendar-day');
selectButton = document.getElementById('select-btn');
monthYearSelector = document.getElementById('month-display');

// display / hide calendar
calendarIcon.addEventListener('click', e => {
    calendar.style.display = 'grid';
    window.addEventListener('click', e => {
        datePicker.contains(e.target) ? {} : calendar.style.display = 'none';
    })
})

// MONTH and YEAR 
let monthCounter = 1; 
let yearCounter = 2020;
let monthsLiteral = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let daysOfMonth = ['', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Next Prev controls
document.getElementById('month-prev-btn').addEventListener('click', e => {
    monthCounter--;
    updateMonthYear();
    updateDays();
});

document.getElementById('month-next-btn').addEventListener('click', e => {
    monthCounter++;
    updateMonthYear();
    updateDays();
});

function updateMonthYear() {
    if (monthCounter <= 0) {
        monthCounter = 12;
        yearCounter--;
    } else if (monthCounter > 12) {
        monthCounter = 1;
        yearCounter++;
    } 
    monthYearSelector.innerText = `${monthsLiteral[monthCounter]} ${yearCounter}` ;
}

// DAY
function activateDays() {  
    yearCounter%4 == 0 ?  daysOfMonth[2] = 29 : daysOfMonth[2] = 28;
    for (let i = 0; i < daysOfMonth[monthCounter]; i++) {
        days[i].classList.add('calendar-day-valid');
        days[i].addEventListener('click', selectDay);
    }
}

let selectDay = function (e) {
    document.querySelectorAll('.day-active')[0].classList.remove('day-active');
    e.target.classList.add('day-active');
}

//Update days
function updateDays() {
    for (let i = 0; i < days.length; i++) {
        days[i].classList.remove('calendar-day-valid');
        days[i].removeEventListener('click', selectDay);
    }
    activateDays();
}

activateDays();

// SELECT DATE
selectButton.addEventListener('click', e => {
    let activeDay = document.querySelectorAll('.day-active')[0];
    if (activeDay.classList.contains('calendar-day-valid')) {
        date.innerText = activeDay.innerText + ' ' + `${monthCounter} ${yearCounter}`;
        calendar.style.display = 'none';
    }  
});
