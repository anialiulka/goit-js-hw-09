const data = {
  delay: '',
  step: '',
  amount: '',
};

const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amountOfPromises = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  handleInput();
  for (let i = 1; i <= data.amount; i += 1) {
    createPromise(i, data.delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    data.delay += data.step;
  }
}

function handleInput() {
  data.delay = parseInt(firstDelay.value);
  data.step = parseInt(delayStep.value);
  data.amount = parseInt(amountOfPromises.value);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
