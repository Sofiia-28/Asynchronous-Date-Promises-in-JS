import Notiflix from 'notiflix';
// Refs
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
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
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        alert(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        alert(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      userData = {
        firstDelay: form.elements.delay.value,
        step: form.elements.step.value,
        amount: form.elements.amount.value,
      };
      console.log(userData);
      if (shouldResolve) {
        res({position, delay});
      } else {
        rej({position, delay});
      }
    }, userData.firstDelay);
  });
}