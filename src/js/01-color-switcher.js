
const ref = {
  'startBtn': document.querySelector('[data-start]'),
  'stopBtn': document.querySelector('[data-stop]'),
  'body': document.querySelector('body'),
}

ref.startBtn.addEventListener('click', startBtnHandler)
ref.stopBtn.addEventListener('click', stopBtnHandler)
ref.stopBtn.setAttribute('disabled', 'true')

let intervalId = null

function startBtnHandler() {
  ref.stopBtn.removeAttribute('disabled')
  ref.startBtn.setAttribute('disabled', 'true')
  intervalId = setInterval(()=>{
    ref.body.style.backgroundColor = `${getRandomHexColor()}`
  },1000)
}

function stopBtnHandler() {
  intervalId ? clearInterval(intervalId) : null
  ref.startBtn.removeAttribute('disabled')
  ref.stopBtn.setAttribute('disabled', 'true')
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}