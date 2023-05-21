import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  buttonEl: document.querySelector('button'),
  inputNameEl: document.querySelector('input[type="text"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.inputNameEl.addEventListener('focus', onFocusName);
refs.inputNameEl.addEventListener('blur', onBlurName);

setPlaceholder();

function onFocusName() {
  refs.inputNameEl.value = '';
}

function onBlurName() {
  if (refs.inputNameEl.value === '') {
    refs.inputNameEl.value = 'Anonymous';
  }
}

function setPlaceholder() {
  refs.inputNameEl.value = 'Anonymous';
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  refs.buttonEl.setAttribute('disabled', '');
  const {
    elements: { 'user-name': userNameInput, delay, step, amount },
  } = e.currentTarget;

  //   const delay = refs.formEl.elements.delay;
  //   const step = refs.formEl.elements.step;
  //   const amount = refs.formEl.elements.amount;

  const userName = userNameInput.value;
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  let promiseDelay = delayValue;
  let promiseCount = 1;

  for (let i = 0; i < amountValue; i += 1) {
    createPromise(promiseCount, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Hi ${userName}, ✅ Fulfilled promise ${position} in ${delay}ms`,
          { clickToClose: true }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `Hi ${userName} , ❌ Rejected promise ${position} in ${delay}ms`,
          { clickToClose: true }
        );
      })
      .finally(() => {
        refs.buttonEl.removeAttribute('disabled');
        refs.formEl.reset();
        setPlaceholder();
      });
    promiseDelay += stepValue;
    promiseCount += 1;
  }
}
