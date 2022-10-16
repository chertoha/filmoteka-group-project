// import authModal from './modal';
import Modal from './classes/Modal';

import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref, update, get, child } from 'firebase/database';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
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

//MODAL==========================================
// const authModal = new Modal({
//   openModalBtn: '[data-auth-modal-open]',
//   closeModalBtn: '[data-auth-modal-close]',
//   modal: '[data-auth-modal]',
// });
// authModal.addHandler();
//MODAL==========================================

//MODAL REFS=========================================
const modalRefs = {
  openModalBtn: document.querySelector('[data-auth-modal-open]'),
  closeModalBtn: document.querySelector('[data-auth-modal-close]'),
  backdrop: document.querySelector('[data-auth-modal]'),
};

modalRefs.openModalBtn.addEventListener('click', onOpenBtn);
modalRefs.closeModalBtn.addEventListener('click', onCloseButtonClick);
modalRefs.backdrop.addEventListener('click', onBackdropClick);

function onOpenBtn(e) {
  e.preventDefault();
  console.log('listener +');
  switchModal(true);
  window.addEventListener('keydown', onEscapePress);
}

function onCloseButtonClick(e) {
  closeModal();
}

function onBackdropClick(e) {
  if (e.target !== e.currentTarget) return;
  closeModal();
}

function onEscapePress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function removeEscapeListener() {
  window.removeEventListener('keydown', onEscapePress);
}

function closeModal() {
  switchModal(false);
  removeEscapeListener();
}

function switchModal(isEnabled) {
  modalRefs.backdrop.classList.toggle('is-hidden', !isEnabled);
}
//MODAL REFS=========================================

///// REFS==============================================
const refs = {
  formLogin: document.querySelector('.js-form-login'),
  formReg: document.querySelector('.js-form-reg'),
  goToRegBtn: document.querySelector('.js-btn-go-to-registration'),
  goToLoginBtn: document.querySelector('.js-btn-go-to-login'),
  signInBtn: document.querySelector('[data-auth-modal-open]'),
  signOutBtn: document.querySelector('.js-signout'),
};

refs.goToRegBtn.addEventListener('click', () => {
  switchToRegistrationForm();
});

refs.goToLoginBtn.addEventListener('click', () => {
  switchToLoginForm();
});

function switchToLoginForm() {
  refs.formLogin.classList.remove('hidden');
  refs.formReg.classList.add('hidden');
}

function switchToRegistrationForm() {
  refs.formLogin.classList.add('hidden');
  refs.formReg.classList.remove('hidden');
}

let userTitle = 'LOGIN';
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

  createUser(auth, username, email, password);
  e.target.reset();
  // authModal.closeModal();
  // closeModal();
  switchToLoginForm();
});

//SIGN IN===============================================
refs.formLogin.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.target.elements;
  const email = form.email.value;
  const password = form.password.value;

  signInUser(auth, email, password);
  e.target.reset();
  // authModal.closeModal();
  closeModal();
});
//SIGN IN===============================================

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    console.log('user is loged now');
    // const uid = user.uid;
    console.log('user ->', user);

    refs.signOutBtn.classList.remove('hidden');

    changeUserTitle(refreshUserTitle);
    modalRefs.openModalBtn.removeEventListener('click', onOpenBtn);
  } else {
    // User is signed out
    refs.signOutBtn.classList.add('hidden');
    modalRefs.openModalBtn.addEventListener('click', onOpenBtn);

    userTitle = 'LOGIN';
    refreshUserTitle();

    console.log('user is sign out now');
  }
});

refs.signOutBtn.addEventListener('click', signOutUser);

////////////////FIREBASE API FUNCTIONS =======================================

//////Sign In User
async function signInUser(auth, email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const dt = new Date();
    await update(ref(database, 'users/' + user.uid), {
      last_login: dt,
    });

    await updateUserTitle(auth, user.uid);

    console.log('User sign in');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('Error code: ', errorCode);
    console.log('Error message: ', errorMessage);
  }
}
//===========================================================================

///////User Registration
async function createUser(auth, username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await set(ref(database, 'users/' + user.uid), {
      username: username,
      email: email,
    });

    // signInUser(auth, email, password);

    console.log('user registered success');
  } catch (error) {
    const errorMessage = error.message;
    console.log(errorMessage);
  }
}
//===========================================================================

async function updateUserTitle(auth, userId) {
  const dbRef = ref(getDatabase());

  const snapshot = await get(child(dbRef, 'users/' + userId));
  let val = {};
  if (snapshot.exists()) {
    val = snapshot.val();
  } else {
    console.log('No data available');
  }
  const username = val.username;
  await updateProfile(auth.currentUser, {
    displayName: username,
  });
}

async function signOutUser() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('user signed out');
    })
    .catch(error => {
      // An error happened.
      console.log(error);
    });
}

////////////////FIREBASE API FUNCTIONS =======================================

async function changeUserTitle(callback) {
  const auth = getAuth();
  const userId = auth.currentUser.uid;

  await updateUserTitle(auth, userId);
  userTitle = auth.currentUser.displayName;
  callback();
}

function refreshUserTitle() {
  refs.signInBtn.innerText = userTitle;
}
