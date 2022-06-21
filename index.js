import countries from './countries.json' assert { type: 'json' };

const countrylist = document.querySelector('[data-js=countrylist]');
const searchfield = document.querySelector('[data-js=searchfield]');
const body = document.body;

searchfield.addEventListener('input', (event) => {
  const searchQuery = event.target.value;
  countrylist.classList.remove('hidden');
  countrylist.innerHTML = '';
  const matchingCountries = countries.filter((country) => {
    return country.toLowerCase().startsWith(searchQuery.toLowerCase());
  });
  matchingCountries.slice(0, 4).forEach((country) => {
    const newCountry = countryComponent(country);
    countrylist.appendChild(newCountry);
  });
  if (matchingCountries.length === 0) {
    const noResult = document.createElement('li');
    noResult.textContent = 'no results';
    noResult.classList.add('no-result');
    countrylist.appendChild(noResult);
  }
});

searchfield.addEventListener('click', (event) => {
  event.stopPropagation();
  countrylist.classList.remove('hidden');
});

searchfield.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowDown':
      countrylist.firstChild?.firstChild?.focus();
      event.preventDefault();
      break;
    default:
      break;
  }
});

body.addEventListener('click', () => {
  countrylist.classList.add('hidden');
});

function countryComponent(country) {
  const newCountry = document.createElement('li');
  const countryButton = document.createElement('button');
  countryButton.textContent = country;
  countryButton.addEventListener('click', () => {
    searchfield.value = country;
  });
  countryButton.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        countryButton.parentElement.previousSibling?.firstChild.focus();
        event.preventDefault();
        break;
      case 'ArrowDown':
        countryButton.parentElement.nextSibling?.firstChild.focus();
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  newCountry.appendChild(countryButton);
  return newCountry;
}
