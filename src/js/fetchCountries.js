const BASE_API = 'https://restcountries.com/v3.1/';
const SEARCH_BY_NAME = `name/`;
const FIELDS = `?fields=name,capital,population,flags,languages`;

export default function fetchCountries(name) {
  return fetch(`${BASE_API}${SEARCH_BY_NAME}${name}${FIELDS}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
