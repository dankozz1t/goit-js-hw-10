export default function fetchCountries(name) {
  const base = `https://restcountries.com/v3.1/name/${name}`;
  // const fields = `?fields=name.official,capital,population,flags.svg,languages`;
  const fields = `?fields=name,capital,population,flags,languages`;
  return fetch(base + fields).then(response => response.json());
}
