import countries from "./countries.json" assert {type: "json"};

const countrylist = document.querySelector("[data-js=countrylist]")
const searchfield = document.querySelector("[data-js=searchfield]")
const body = document.body

searchfield.addEventListener('input', (event) => {
    const searchQuery = event.target.value 
    countrylist.classList.remove("hidden")
    countrylist.innerHTML = ""
    const matchingCountries = countries.filter(country => {
        return country.toLowerCase().startsWith(searchQuery.toLowerCase())
    }) 
    matchingCountries.slice(0,4).forEach(country => {
        const newCountry = countryComponent(country)
        countrylist.appendChild(newCountry)
    })
    if (matchingCountries.length === 0){
        const noResult = document.createElement("li")
        noResult.textContent = "no results"
        noResult.classList.add("no-result")
        countrylist.appendChild(noResult)
    }
})
searchfield.addEventListener('click', (event) => {
    event.stopPropagation()
    countrylist.classList.remove("hidden")
})

body.addEventListener('click', () => {
    countrylist.classList.add("hidden")
})

function countryComponent (country){
    const newCountry = document.createElement("li")
        const countryButton = document.createElement("button")
        countryButton.textContent = country
        countryButton.addEventListener('click', () => {
            searchfield.value = country
        })
        newCountry.appendChild(countryButton)
        return newCountry
}
