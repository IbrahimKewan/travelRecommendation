document.addEventListener("DOMContentLoaded", () => {
    loadSection("home");
});

/**
 * Lädt einen HTML-Abschnitt dynamisch in das Hauptelement der Seite.
 * Fügt einen Fade-in-Effekt hinzu und behandelt Fehler beim Laden.
 *
 * @param {string} htmlName - Der Name der HTML-Datei (ohne Erweiterung) im 'sections'-Verzeichnis.
 * @returns {void}
 */
function loadSection(htmlName) {
    fetch(`sections/${htmlName}.html`)
        .then((res) => {
            if (!res.ok) throw new Error("datei nicht gefunden");
            return res.text();
        })
        .then((html) => {
            const main = document.getElementById("main-content");
            main.innerHTML = html;

            main.classList.remove("fade-in");
            void main.offsetWidth;
            main.classList.add("fade-in");
        })
        .catch((err) => {
            document.getElementById(
                "main-content"
            ).innerHTML = `<p style= "color:red;" >Fehler bei ${err.message}</p>`;
        });
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchIcon = document.getElementById("searchIcon");

if (!searchInput || !searchBtn || !searchIcon) {
    console.error("One or more search elements are missing in the DOM.");
}

/**
 * Holt Reisedaten aus einer lokalen JSON-Datei und zeigt Städte des Landes an,
 * das mit der Benutzereingabe übereinstimmt. Aktualisiert das DOM mit Stadtkarten.
 *
 * @function
 * @returns {void}
 */
function getSearingData() {
    const searchInputValue = document.getElementById("searchInput").value;
    fetch("travel_recommendation_api.json")
        .then((res) => res.json())
        .then((data) => {
            let found = false;
            const outputCountry = document.getElementById("outputCountry");
            if (outputCountry) {
                outputCountry.innerHTML = "";
                outputCountry.classList.remove("hide");
            } else {
                console.error("Element 'outputCountry' not found in the DOM.");
            }

            data.countries.forEach((country) => {
                if (
                    country.name.toLowerCase() ===
                    searchInputValue.toLowerCase()
                ) {
                    found = true;
                    const countryHeader = document.createElement("h2");
                    countryHeader.textContent = country.name;
                    outputCountry.appendChild(countryHeader);

                    const cityContainer = document.createElement("div");
                    cityContainer.classList.add("city-container");

                    country.cities.forEach((city) => {
                        const cityCard = createCityCard(city);
                        cityContainer.appendChild(cityCard);
                    });
                    outputCountry.appendChild(cityContainer);
                }
            });

            data.temples.forEach((temple) => {
                const array = temple.name.split(",");

                const templeHeader = document.createElement("h2");
                if (
                    searchInputValue.toLowerCase() === "tempel" ||
                    temple.name
                        .toLowerCase()
                        .includes(searchInputValue.toLowerCase())
                ) {
                    array.forEach((name) => {
                        found = true;
                        templeHeader.textContent = temple.name;
                        outputCountry.appendChild(templeHeader);
                    });

                    const templeCard = createCityCard(temple);
                    outputCountry.appendChild(templeCard);
                }
            });

            data.beaches.forEach((beach) => {
                if (
                    searchInputValue.toLowerCase() === "beach" ||
                    beach.name
                        .toLowerCase()
                        .includes(searchInputValue.toLowerCase())
                ) {
                    found = true;
                    const beachHeader = document.createElement("h2");
                    beachHeader.textContent = beach.name;
                    outputCountry.appendChild(beachHeader);
                    const beachCard = createCityCard(beach);
                    outputCountry.appendChild(beachCard);
                }
            });

            function createCityCard(city) {
                const card = document.createElement("div");
                card.classList.add("destination-card");
                card.innerHTML = `
                    <h3>${city.name}</h3>
                    <img src="${city.imageUrl}" alt="${city.name}" />
                    <p>${city.description}</p>
                `;
                return card;
            }

            if (!found) {
                const outputCountry = document.getElementById("outputCountry");
                if (outputCountry) {
                    outputCountry.innerHTML = `<p style="color: red;">Land oder Tempel nicht gefunden. Bitte versuchen Sie es erneut.</p>`;
                    outputCountry.classList.remove("hide");
                }
            }
        })
        .catch((err) => {
            console.error("Fehler beim Abrufen der Daten:", err);
        });
}

if (searchBtn) {
    searchBtn.addEventListener("click", getSearingData);
}
if (searchIcon) {
    searchIcon.addEventListener("click", getSearingData);
}

const clearBtn = document.getElementById("clearBtn");
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        const outputCountry = document.getElementById("outputCountry");
        if (outputCountry) {
            outputCountry.innerHTML = "";
            outputCountry.classList.add("hide");
        }
        if (searchInput) {
            searchInput.value = "";
        }
    });
}

const outputCountry = document.getElementById("outputCountry");
outputCountry.innerHTML = "";
outputCountry.classList.add("hide");
