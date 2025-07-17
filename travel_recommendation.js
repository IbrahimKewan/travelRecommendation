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
            data.countries.forEach((country) => {
                if (
                    country.name.toLowerCase() == searchInputValue.toLowerCase()
                ) {
                    const outputCountry =
                        document.getElementById("outputCountry");
                    if (outputCountry) {
                        outputCountry.innerHTML = "";
                        outputCountry.classList.remove("hide");
                        country.cities.forEach((city) => {
                            console.log(city.name);

                            const card = document.createElement("div");
                            card.classList.add("destination-card");
                            card.innerHTML = `
                <h3>${city.name}</h3>
                <img src="${city.imageUrl}" alt="${city.name}" />
                <p>${city.description}</p>
            `;
                            outputCountry.appendChild(card);
                        });
                    }
                }
            });
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
