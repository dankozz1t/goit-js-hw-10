import './css/styles.css';

import _debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchCountries from './js/fetchCountries.js';

import templateCountryList from './templates/country-list.hbs';
import templateCountryInfo from './templates/country-info.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener(
  'input',
  _debounce(onSearchCountryInput, DEBOUNCE_DELAY)
);

function onSearchCountryInput(event) {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
  refs.inputEl.style.borderColor = 'black';

  if (!event.target.value.trim()) {
    return;
  }

  fetchCountries(event.target.value.trim())
    .then(countries => {
      renderMarkup(countries);
    })
    .catch(console.log);
}

function renderMarkup(countries) {
  refs.inputEl.style.borderColor = 'blue';
  if (!countries.length) {
    Notify.failure('Oops, there is no country with that name');
    refs.inputEl.style.borderColor = 'red';
    return;
  } else if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.inputEl.style.borderColor = 'cyan';
    return;
  }

  let markupInfo = '';
  let markupList = '';

  if (countries.length >= 2) {
    for (let i = 0; i < countries.length; i++) {
      markupList += templateCountryList(countries[i]);
    }
  } else {
    markupList = templateCountryList(...countries);
    markupInfo = templateCountryInfo(...countries);
    refs.inputEl.style.borderColor = 'chartreuse';

    refs.countryInfoEl.insertAdjacentHTML('afterbegin', markupInfo);
  }

  refs.countryListEl.insertAdjacentHTML('afterbegin', markupList);
}
