function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const buttonStartGenerating = document.querySelector('[data-start]');
const buttonStopGenerating = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

buttonStopGenerating.disabled = true;

buttonStartGenerating.addEventListener('click', onClickStartGenerating);
buttonStopGenerating.addEventListener('click', onClickStopGenerating);

function onClickStartGenerating() {
  buttonStartGenerating.disabled = true;
  buttonStopGenerating.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopGenerating() {
  clearInterval(timerId);
  buttonStartGenerating.disabled = false;
  buttonStopGenerating.disabled = true;
}
