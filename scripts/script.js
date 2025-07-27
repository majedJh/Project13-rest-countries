const elements = {
    countriesContainer: document.querySelector(".countries-container"),
    regionFilterList: document.querySelector(".filter-list"),
    filterBtnLabel: document.querySelector(".filter-button > div"),
    countrySearchInput: document.querySelector(".search input"),
    colorThemeImg: document.querySelector(".color-theme img"),
    searchIconImg: document.querySelector(".search-icon img"),
    listShowArrow: document.querySelector(".filter-button button img")
};
const btns = {
    filterbtn: document.querySelector(".filter-button"),
    searchBtn: document.querySelector(".search-icon"),
    colorThemeBtn: document.querySelector("button.color-theme")
};
import { countriesMapOfficial, countriesMapCommon, countriesMapsPromise, formatPopulation } from "./mapDataLoader.js";
await countriesMapsPromise;

const filteredCountries = new Set();
let filteredIndex = 0;
const batchSize = 12;

//main

applyFilters("all");
setInitialColorTheme();
btns.filterbtn.addEventListener("click", showFiltersList);
btns.filterbtn.addEventListener("keydown", event => {
    if (event.code == "Enter") {
        showFiltersList(event)
    }
})
elements.regionFilterList.addEventListener("click", selectRegionFilter);
btns.searchBtn.addEventListener("click", searchForCountry);
elements.countrySearchInput.closest(".search").addEventListener("keydown", event => {
    if (event.code == "Enter") {
        searchForCountry(event)
    }
})
elements.countriesContainer.addEventListener("click", goToCountryPage);
elements.countriesContainer.addEventListener("keydown", event => {
    if (event.code == "Enter") {
        goToCountryPage(event);
    }
});
btns.colorThemeBtn.addEventListener("click", togglecolorTheme);
//end main

async function applyFilters(region) {
    filteredCountries.clear();
    for (const value of countriesMapOfficial.values()) {
        if (matchesRegion(value, region)) {
            filteredCountries.add(value);
        }
    }
    filteredIndex = 0;
    elements.countriesContainer.innerHTML = "";
    elements.countrySearchInput.value = "";
    loadNextFilteredBatch();
}
function matchesRegion(data, region) {
    if (region == "all") return true;
    return data.region.toLowerCase() == region.toLowerCase();
}
function loadNextFilteredBatch() {
    const end = filteredIndex + batchSize;
    const filteredCountriesArr = Array.from(filteredCountries);
    for (let i = filteredIndex; i < end && i < filteredCountries.size; i++) {
        const data = filteredCountriesArr[i];
        if (!data) return;
        const countryCard = createCountryCard(data);
        elements.countriesContainer.appendChild(countryCard);
    }

    filteredIndex = end;

    if (filteredIndex < filteredCountries.size) {
        observeLastFilteredItem();
    }
}
function observeLastFilteredItem() {
    const lastItem = elements.countriesContainer.lastElementChild;
    if (!lastItem) return;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            observer.unobserve(entries[0].target);
            loadNextFilteredBatch();
        }
    }, {
        threshold: 0.5,
    });

    observer.observe(lastItem);
}
function createCountryCard(data) {
    const flagSVG = data.flags.svg;
    const flagAlt = data.flags.alt;
    const countryName = data.name.official;
    const population = formatPopulation(data.population);
    const region = data.region;
    const capital = data.capital[0];
    elements.countriesContainer.insertAdjacentHTML("beforeend", `<div class="card" tabindex="0">
                    <div class="flag-img">
                        <img src=${flagSVG} alt=${flagAlt} loading="lazy">
                    </div>
                    <div class="country-info">
                        <div class="country-name" data-value="${countryName}">${countryName}</div>
                        <div class="population d-flex">
                            <div>Population:</div>
                            <div class="population-data" data-value="${population}">${population}</div>
                        </div>
                        <div class="region d-flex">
                            <div>Region:</div>
                            <div class="region-data" data-value="${region}">${region}</div>
                        </div>
                        <div class="capital d-flex">
                            <div class="capital">Capital:</div>
                            <div class="capital-data" data-value="${capital}">${capital}</div>
                        </div>
                    </div>
                </div>`);
    return elements.countriesContainer.lastElementChild;
}
function showFiltersList(event) {

    if (elements.regionFilterList.classList.contains("hidden")) {
        elements.regionFilterList.classList.remove("hidden");
        adjustShowListArrow();
        setTimeout(() => {
            window.addEventListener("click", window.hideList = e => {
                hideFiltersList();
                adjustShowListArrow()
                window.removeEventListener("click", window.hideList);
            })
        }, 100);
        window.addEventListener("keydown", window.keyboardHideList = e => {
            if (e.code == "Escape") {
                hideFiltersList();
                btns.filterbtn.blur();
                adjustShowListArrow();
                window.removeEventListener("click", window.hideList);
                window.removeEventListener("keydown", window.hideFiltersList);
            }
        })
    } else {
        hideFiltersList();
        adjustShowListArrow();
        window.removeEventListener("click", window.hideList);
        window.removeEventListener("keydown", window.hideFiltersList);
    }
}
function adjustShowListArrow() {
    if (elements.regionFilterList.classList.contains("hidden")) {
        if (document.body.classList.contains("dark")) {
            elements.listShowArrow.setAttribute("src", "./images/icons8-down-arrow-dark.png");
        } else {
            elements.listShowArrow.setAttribute("src", "./images/icons8-down-arrow-light.png");
        }
    } else {
        if (document.body.classList.contains("dark")) {
            elements.listShowArrow.setAttribute("src", "./images/icons8-up-arrow-dark.png");
        } else {
            elements.listShowArrow.setAttribute("src", "./images/icons8-up-arrow-light.png");
        }
    }
}
function hideFiltersList() {
    elements.regionFilterList.classList.add("hidden");
}
function selectRegionFilter(event) {
    const selectedFilter = event.target.closest("button");
    if (!selectedFilter) return;
    const filterValue = selectedFilter.getAttribute("data-value");
    applyFilters(filterValue);
    adjustFilterLabel(filterValue);
    hideFiltersList();

}
function adjustFilterLabel(filterValue = "Filter by region") {
    elements.filterBtnLabel.innerText = filterValue;
}
function searchForCountry(event) {
    let countryCard;
    let data = null;
    const searchValue = elements.countrySearchInput.value.toLowerCase().trim();
    if (searchValue == "") {
        applyFilters("all");
        return;
    }
    if (countriesMapCommon.get(searchValue)) {
        data = countriesMapCommon.get(searchValue);
        countryCard = createCountryCard(data);
    }
    else if (countriesMapOfficial.get(searchValue)) {
        data = countriesMapOfficial.get(searchValue);
        countryCard = createCountryCard(data);
    } else {
        countryCard = document.createTextNode("No countries found, please try again with different input :)");
    }
    addCountry(countryCard, data);
    elements.countrySearchInput.blur();
}
function addCountry(countryCard, data) {
    elements.countriesContainer.innerHTML = "";
    filteredCountries.clear();
    if (data) {
        filteredCountries.add(data);
    }
    adjustFilterLabel();
    elements.countriesContainer.appendChild(countryCard);
}
function goToCountryPage(event) {
    const countryCard = event.target.closest(".card");
    if (!countryCard) return;
    const officialName = countryCard.querySelector(".country-name").getAttribute("data-value").toLowerCase();
    const commonName = countriesMapOfficial.get(officialName).name.common.toLowerCase();
    window.location.href = `country.html?name=${commonName}`;
}
function setInitialColorTheme() {
    let savedTheme = localStorage.getItem("lightMode");

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isLight = savedTheme ? savedTheme === "light" : prefersLight;

    const theme = isLight ? "light" : "dark";
    localStorage.setItem("lightMode", theme);

    if (isLight) {
        setHomeLightMode();
    } else {
        setHomeDarkMode();
    }
}
function setHomeLightMode() {
    localStorage.setItem("lightMode", "light");
    document.body.classList.remove("dark");
    elements.colorThemeImg.setAttribute("src", "/images/icons8-moon-light.png");
    elements.searchIconImg.setAttribute("src", "/images/icons8-search-light.png");
    if (elements.regionFilterList.classList.contains("hidden")) {
        elements.listShowArrow.setAttribute("src", "./images/icons8-down-arrow-light.png");
    } else {
        elements.listShowArrow.setAttribute("src", "./images/icons8-up-arrow-light.png");
    }
}
function setHomeDarkMode() {
    localStorage.setItem("lightMode", "dark");
    document.body.classList.add("dark");
    elements.colorThemeImg.setAttribute("src", "/images/icons8-moon-dark.png");
    elements.searchIconImg.setAttribute("src", "/images/icons8-search-dark.png");
    if (elements.regionFilterList.classList.contains("hidden")) {
        elements.listShowArrow.setAttribute("src", "./images/icons8-down-arrow-dark.png");
    } else {
        elements.listShowArrow.setAttribute("src", "./images/icons8-up-arrow-dark.png");
    }
}
function togglecolorTheme() {
    if (document.body.classList.contains("dark")) {
        setHomeLightMode();
        return;
    }
    setHomeDarkMode();
}