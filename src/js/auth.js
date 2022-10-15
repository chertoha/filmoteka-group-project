const refs = {
  formLogin: document.querySelector('.js-form-login'),
  formReg: document.querySelector('.js-form-reg'),
  goToRegBtn: document.querySelector('.js-btn-go-to-registration'),
  goToLoginBtn: document.querySelector('.js-btn-go-to-login'),
};

refs.goToRegBtn.addEventListener('click', () => {
  refs.formLogin.classList.add('hidden');
  refs.formReg.classList.remove('hidden');
});

refs.goToLoginBtn.addEventListener('click', () => {
  refs.formReg.classList.add('hidden');
  refs.formLogin.classList.remove('hidden');
});
