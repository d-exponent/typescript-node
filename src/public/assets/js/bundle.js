(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const loginForm = document.getElementById('login-form');
const registrationForm = document.getElementById('registration-form');

/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all);
  if (selectEl) {
    if (all) {
      selectEl.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  }
};

/**
 * Mobile nav toggle
 */
const toogleNav = function () {
  let navButton = select('.nav-toggle');
  navButton.classList.toggle('nav-toggle-active');
  navButton.querySelector('i').classList.toggle('bx-x');
  navButton.querySelector('i').classList.toggle('bx-menu');

  select('.nav-menu').classList.toggle('nav-menu-active');
};
on('click', '.nav-toggle', function (e) {
  toogleNav();
});

/**
 * Mobile nav dropdowns activate
 */
on(
  'click',
  '.nav-menu .drop-down > a',
  function (e) {
    e.preventDefault();
    this.nextElementSibling.classList.toggle('drop-down-active');
    this.parentElement.classList.toggle('active');
  },
  true
);

/**
 * Scrool links with a class name .scrollto
 */
on(
  'click',
  '.scrollto',
  function (e) {
    if (select(this.hash)) {
      select('.nav-menu .active').classList.remove('active');
      this.parentElement.classList.toggle('active');
      toogleNav();
    }
  },
  true
);

if (registrationForm) {
  document.backgroundColor = 'black';

  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('😀SUBMITTED REGISTRATION FORM');
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('😀SUBMITTED LOGIN FORM');
  });
}

},{}]},{},[1]);
