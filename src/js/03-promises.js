import Notiflix from 'notiflix';
const refs = {
  'form':document.querySelector('.form'),
}
const args = {}
refs.form.addEventListener('input', formChangeHandler)
refs.form.addEventListener('submit', formSubmitHandler)
function formChangeHandler(e) {
  args[e.target.name] = +e.target.value
}
function formSubmitHandler(e) {
  e.preventDefault()
  for (let i = 0; i < args.amount; ++i) {
    if(i===0){
      createPromise(i+1, args.delay )
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    } else {
      createPromise(i+1, args.delay + (args.step * i))
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject)=>{
    const shouldResolve = Math.random() > 0.3;
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    },delay)
  })
}