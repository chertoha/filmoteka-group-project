import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBLiZ8RVJVcxbJe-Xg-IMUy3fkXhjfzP-M',
  authDomain: 'auth-filmoteka-app.firebaseapp.com',
  databaseURL: 'https://auth-filmoteka-app-default-rtdb.firebaseio.com',
  projectId: 'auth-filmoteka-app',
  storageBucket: 'auth-filmoteka-app.appspot.com',
  messagingSenderId: '1077300111014',
  appId: '1:1077300111014:web:e62970f415155fc2f2b667',
};

///// REFS==============================================
const refs = {
  formLogin: document.querySelector('.js-form-login'),
  formReg: document.querySelector('.js-form-reg'),
  goToRegBtn: document.querySelector('.js-btn-go-to-registration'),
  goToLoginBtn: document.querySelector('.js-btn-go-to-login'),
  signOutBtn: document.querySelector('.js-signout'),
};

refs.goToRegBtn.addEventListener('click', () => {
  refs.formLogin.classList.add('hidden');
  refs.formReg.classList.remove('hidden');
});

refs.goToLoginBtn.addEventListener('click', () => {
  refs.formReg.classList.add('hidden');
  refs.formLogin.classList.remove('hidden');
});
///// REFS==============================================

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

refs.formReg.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.target.elements;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });

      e.target.clear;

      console.log('user created');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

refs.formLogin.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.target.elements;
  const email = form.email.value;
  const password = form.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,
      });

      console.log('User loged in');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log('user is loged now');
    const uid = user.uid;

    refs.signOutBtn.classList.remove('hidden');
  } else {
    // User is signed out
    // ...

    refs.signOutBtn.classList.add('hidden');
    console.log('user is sign out now');
  }
});

refs.signOutBtn.addEventListener('click', e => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('user signed out');
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });
});
