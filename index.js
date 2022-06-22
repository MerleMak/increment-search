const countrylist = document.querySelector("[data-js=countrylist]");
const searchfield = document.querySelector("[data-js=searchfield]");
const body = document.body;

searchfield.addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  countrylist.classList.remove("hidden");
  countrylist.innerHTML = "";
  fetchCountries(searchQuery).then((data) => {
    const matchingCountries = data;

    matchingCountries.slice(0, 4).forEach((country) => {
      const newCountry = countryComponent({ country });
      countrylist.appendChild(newCountry);
    });

    if (matchingCountries.length === 0) {
      const noResult = document.createElement("li");
      noResult.textContent = "no results";
      noResult.classList.add("no-result");
      countrylist.appendChild(noResult);
    }
  });
});

searchfield.addEventListener("click", (event) => {
  event.stopPropagation();
  countrylist.classList.remove("hidden");
});

searchfield.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown":
      countrylist.firstChild?.firstChild?.focus();
      event.preventDefault();
      break;
    default:
      break;
  }
});

body.addEventListener("click", () => {
  countrylist.classList.add("hidden");
});

function countryComponent({ country }) {
  const newCountry = document.createElement("li");

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowUp":
        countryButton.parentElement.previousSibling?.firstChild.focus();
        event.preventDefault();
        break;
      case "ArrowDown":
        countryButton.parentElement.nextSibling?.firstChild.focus();
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  const countryButton = buttonComponent({
    yourButtonTextHere: country,
    onClick: () => (searchfield.value = country),
    onKeyDown: handleKeyDown,
  });

  newCountry.appendChild(countryButton);
  return newCountry;
}

function buttonComponent({ yourButtonTextHere, onClick, onKeyDown }) {
  const countryButton = document.createElement("button");
  countryButton.textContent = yourButtonTextHere;
  countryButton.addEventListener("click", onClick);
  countryButton.addEventListener("keydown", onKeyDown);
  return countryButton;
}

function fetchCountries(query) {
  const result = fetch(`https://spicedworld.herokuapp.com/?q=${query}`);
  const data = result.then((res) => res.json());
  return data;
}
