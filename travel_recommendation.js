document.addEventListener("DOMContentLoaded", () => {
  loadSection("home");
});

function loadSection(name) {
    fetch(`sections/${name}.html`)
        .then(res => {
            if (!res.ok) throw new Error("Fehler beim Laden der Section");
            return res.text();
        })
        .then(html => {
            const main = document.getElementById("main-content");
            main.innerHTML = html;

            main.classList.remove("fade-in");
            void main.offsetWidth;
            main.classList.add("fade-in")
        })
        .catch(err => {
            document.getlementById("main-content").innerHTML = `<p style="color:red;">${err.message}</p>`;
        });
}

const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log("Alle Daten:", data);

    const output = document.getElementById('output');
    output.classList.remove('hide');
    // if (data.countries.name === 'Australia'){

    // }

    data.countries.forEach(country => {
      country.cities.forEach(city => {
        const card = document.createElement('div');
        card.classList.add('destination-card');
        card.innerHTML = `
          <h3>${city.name}</h3>
          <img src="${city.imageUrl}" alt="${city.name}" />
          <p>${city.description}</p>
        `;
        output.appendChild(card);
      });
    });

    // Optional: auch temples anzeigen
    data.temples.forEach(temple => {
      const card = document.createElement('div');
      card.classList.add('destination-card');
      card.innerHTML = `
        <h3>${temple.name}</h3>
        <img src="${temple.imageUrl}" alt="${temple.name}" />
        <p>${temple.description}</p>
      `;
      output.appendChild(card);
    });

    // Optional: auch beaches anzeigen
    data.beaches.forEach(beach => {
      const card = document.createElement('div');
      card.classList.add('destination-card');
      card.innerHTML = `
        <h3>${beach.name}</h3>
        <img src="${beach.imageUrl}" alt="${beach.name}" />
        <p>${beach.description}</p>
      `;
      output.appendChild(card);
    });

  })
  .catch(error => console.error("Fehler beim Laden:", error));
});

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () =>{
    const output = document.getElementById('output');
    output.classList.add('hide');
});