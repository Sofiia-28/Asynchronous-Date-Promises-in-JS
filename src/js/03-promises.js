import Notiflix from 'notiflix';
// Refs
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault()
  let userData = {
    firstDelay: form.elements.delay.value,
    step: form.elements.step.value,
    amount: form.elements.amount.value,
  };
  console.log(userData);
  for (let i = 0; i < userData.amount; i++) {
    const currentDelay = Number(userData.firstDelay) + Number(userData.step) * i;
    console.log(currentDelay);
    createPromise(i + 1, currentDelay)
      .then((value) => {
        Notiflix.Notify.success(value);
      })
      .catch((error) => {
        Notiflix.Notify.failure(error);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}