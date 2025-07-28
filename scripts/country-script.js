import { countriesMapCommon, countriesMapsPromise, formatPopulation } from "./mapDataLoader.js";
await countriesMapsPromise;

const elements = {
    colorThemeImg: document.querySelector(".color-theme img"),
    leftArrowimg: document.querySelector(".back-button img"),
    flagImg: document.querySelector(".flag-image img"),
    countryName: document.querySelector(".country-info h3"),
    countryNativeName: document.querySelector(".native-name-data"),
    population: document.querySelector(".population-data"),
    region: document.querySelector(".region-data"),
    subRegion: document.querySelector(".sub-region-data"),
    capital: document.querySelector(".capital-data"),
    topLevelDomain: document.querySelector(".top-level-domain-data"),
    currenices: document.querySelector(".currencies-data"),
    languages: document.querySelector(".languages-data")
}
const btns = {
    backBtn: document.querySelector(".back-button"),
    colorThemeBtn: document.querySelector("button.color-theme")
}

//main
setInitialColorTheme();
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
const data = countriesMapCommon.get(name);
domFillData(data);
btns.backBtn.addEventListener("click", goBackToHomePage);
btns.backBtn.addEventListener("keydown", e => {
    if (e.code == "Enter") {
        goBackToHomePage();
    }
})
btns.colorThemeBtn.addEventListener("click", toggleColorTheme);
//end main

function domFillData(data) {
    //flag
    elements.flagImg.setAttribute("src", data.flags.svg);
    elements.flagImg.setAttribute("alt", data.flags.alt);

    //name
    elements.countryName.innerText = data.name.official;

    //native names
    let nativeNamesList = Object.values(data.name.nativeName);
    let nativeNames = nativeNamesList[0].common;
    for (let i = 1; i < nativeNamesList.length; i++) {
        nativeNames += `, ${nativeNamesList[i].common}`
    }
    elements.countryNativeName.innerText = nativeNames;

    //populaton
    elements.population.innerText = formatPopulation(data.population);

    //region 
    elements.region.innerText = data.region;

    //sub region 
    elements.subRegion.innerText = data.subregion;

    //capital
    elements.capital.innerText = data.capital;

    //top level domain
    elements.topLevelDomain.innerText = data.tld[0].slice(1);

    //currencies
    let currenciesList = Object.values(data.currencies);
    let currenices = currenciesList[0].name;
    if (!currenciesList) currenciesList = "-";
    else {
        for (let i = 1; i < currenciesList.length; i++) {
            currenices += `, ${currenciesList[i].name}`
        }
    }
    elements.currenices.innerText = currenices;

    //languages
    let languagesList = Object.values(data.languages);
    let languages = languagesList[0];
    for (let i = 1; i < languagesList.length; i++) {
        languages += `, ${languagesList[i]}`
    }
    elements.languages.innerText = languages;
}
function goBackToHomePage() {
    window.location.href = "index.html";
}
function setInitialColorTheme() {
    let savedTheme = localStorage.getItem("lightMode");

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const isLight = savedTheme ? savedTheme === "light" : prefersLight;

    const theme = isLight ? "light" : "dark";
    localStorage.setItem("lightMode", theme);

    if (isLight) {
        setCountryLightMode();
    } else {
        setCountryDarkMode();
    }
}
function setCountryLightMode() {
    localStorage.setItem("lightMode", "light");
    document.body.classList.remove("dark");
    elements.colorThemeImg.setAttribute("src", "/images/icons8-moon-light.png");
    elements.leftArrowimg.setAttribute("src", "./images/icons8-arrow-left-light.png")
}
function setCountryDarkMode() {
    localStorage.setItem("lightMode", "dark");
    document.body.classList.add("dark");
    elements.colorThemeImg.setAttribute("src", "/images/icons8-moon-dark.png");
    elements.leftArrowimg.setAttribute("src", "./images/icons8-arrow-left-dark.png")

}
function toggleColorTheme() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        setCountryDarkMode();
    } else {
        setCountryLightMode();
    }
}