// const searchBtn = document.getElementById('searchBtn');

// searchBtn.addEventListener('click', () => {

// fetch('travel_recommendation_api.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log("Alle Daten:", data);

//     const output = document.getElementById('output');
//     output.classList.remove('hide');
//     // if (data.countries.name === 'Australia'){

//     // }

//     data.countries.forEach(country => {
//       country.cities.forEach(city => {
//         const card = document.createElement('div');
//         card.classList.add('destination-card');
//         card.innerHTML = `
//           <h3>${city.name}</h3>
//           <img src="${city.imageUrl}" alt="${city.name}" />
//           <p>${city.description}</p>
//         `;
//         output.appendChild(card);
//       });
//     });

//     // Optional: auch temples anzeigen
//     data.temples.forEach(temple => {
//       const card = document.createElement('div');
//       card.classList.add('destination-card');
//       card.innerHTML = `
//         <h3>${temple.name}</h3>
//         <img src="${temple.imageUrl}" alt="${temple.name}" />
//         <p>${temple.description}</p>
//       `;
//       output.appendChild(card);
//     });

//     // Optional: auch beaches anzeigen
//     data.beaches.forEach(beach => {
//       const card = document.createElement('div');
//       card.classList.add('destination-card');
//       card.innerHTML = `
//         <h3>${beach.name}</h3>
//         <img src="${beach.imageUrl}" alt="${beach.name}" />
//         <p>${beach.description}</p>
//       `;
//       output.appendChild(card);
//     });

//   })
//   .catch(error => console.error("Fehler beim Laden:", error));
// });

// const clearBtn = document.getElementById('clearBtn');
// clearBtn.addEventListener('click', () =>{
//     const output = document.getElementById('output');
//     output.classList.add('hide');
// });

document.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

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

function getSearingData() {
  const searchInputValue = document.getElementById("searchInput").value;
  fetch("travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
      data.countries.forEach((country) => {
        if (country.name.toLowerCase() == searchInputValue.toLowerCase()) {
          country.cities.forEach((city) => {
            console.log(city.name);
          });
        }
      });
    })
    .catch((err) => {
      console.error("Fehler beim Abrufen der Daten:", err);
      document.getElementById(
        "main-content"
      ).innerHTML = `<p style="color:red;">Fehler beim Abrufen der Daten: ${err.message}</p>`;
    });
}

searchBtn.addEventListener("click", getSearingData);
searchIcon.addEventListener("click", getSearingData);
