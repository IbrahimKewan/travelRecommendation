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
      document.getElementById("main-content").innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}
