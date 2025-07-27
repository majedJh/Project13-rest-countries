let isLoaded = false;
export const countriesMapOfficial = new Map();
export const countriesMapCommon = new Map();
export const countriesMapsPromise = countriesMapsReady();

async function countriesMapsReady() {
    if (isLoaded) return;
    const data = await fetchData("https://restcountries.com/v3.1/all?fields=name,region,subregion,population,capital,currencies,languages,tld,borders,flags")
    if (!data) return;
    for (let i = 0; i < data.length; i++) {
        if (data[i].name.common == "Israel") continue;
        countriesMapOfficial.set(data[i].name.official.toLowerCase(), data[i]);
        countriesMapCommon.set(data[i].name.common.toLowerCase(), data[i]);
    }
    isLoaded = true;
}
async function fetchData(link) {
    const controller = new AbortController();
    const timeout = setTimeout(() => { controller.abort() }, 30000);
    try {
        const response = await fetch(link, { signal: controller.signal })
        if (!response.ok) throw new Error("code: " + response.status);
        return await response.json();
    }
    catch (err) {
        if (err.name == "AbortError") {
            console.log("Abort error: exceeded time limit, fetch aborted")
        } else {
            console.log("Fetch Error: " + err)
        }
        return null;
    }
    finally {
        clearTimeout(timeout);
    }
}
export function formatPopulation(countryPopulation) {
    const populationStrTemp = `${countryPopulation}`.split("").reverse().join("");
    let population = ``;
    for (let i = 0; i < populationStrTemp.length; i++) {
        if (i > 0 && i % 3 == 0) {
            population += `,${populationStrTemp[i]}`;
            continue;
        }
        population += populationStrTemp[i];
    }
    return population.split("").reverse().join("");
}