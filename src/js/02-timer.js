import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
  'input': document.querySelector('#datetime-picker'),
  'startBtn': document.querySelector('[data-start]'),
  'days': document.querySelector('[data-days]'),
  'hours': document.querySelector('[data-hours]'),
  'minutes': document.querySelector('[data-minutes]'),
  'seconds': document.querySelector('[data-seconds]'),
}
refs.startBtn.setAttribute('disabled', 'true')
let selectedDate = null
let datePick = false


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(datePick){
      return
    }
    if((Date.now()-new Date(selectedDates[0]).getTime()) < 0){
      refs.startBtn.removeAttribute('disabled')
      refs.startBtn.addEventListener('click', startBtnHandler)
      selectedDate = new Date(selectedDates[0]).getTime()
    }
    if((Date.now()-new Date(selectedDates[0]).getTime()) > 0){
      refs.startBtn.setAttribute('disabled', 'true')
      selectedDate = null
      Notiflix.Notify.failure("Please choose a date in the future");
    }
  },
}

flatpickr(refs.input, options)

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}


function pad(value) {
  return String(value).padStart(2, '0')
}

function startBtnHandler() {
  datePick = !datePick

  const intervalID = setInterval(()=>{
    const timeDiff = convertMs(selectedDate - Date.now())
    refs.days.innerText = timeDiff.days
    refs.hours.innerText = timeDiff.hours
    refs.minutes.innerText = timeDiff.minutes
    refs.seconds.innerText = timeDiff.seconds
    if(timeDiff.days === '00' && timeDiff.hours === '00' && timeDiff.minutes === '00' && timeDiff.seconds === '00' ){
      clearInterval(intervalID)
    }
  },1000)
  refs.startBtn.removeEventListener('click', startBtnHandler)
}