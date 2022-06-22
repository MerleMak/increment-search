const countrylist = document.querySelector("[data-js=countrylist]");
const searchfield = document.querySelector("[data-js=searchfield]");
const body = document.body;

searchfield.addEventListener("input", (event) => {
  const searchQuery = event.target.value;
  countrylist.classList.remove("hidden");
  countrylist.innerHTML = "";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://spicedworld.herokuapp.com/?q=${searchQuery}`);
  xhr.send();

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState != XMLHttpRequest.DONE) {
      return;
    }
    let status;
    try {
      status = xhr.status;
    } catch (error) {
      console.error(error);
      return;
    }
    if (status !== 200) {
      console.error(`Error: HTTP status code ${status}.`);
      return;
    }

    const response = xhr.responseText;
    let data;
    try {
      data = JSON.parse(response);
    } catch (error) {
      console.error(error);
      return;
    }

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
