document.addEventListener("DOMContentLoaded", async () => {
  const calendar = document.getElementById("calendar");
  const today = new Date().toISOString().split("T")[0]; // Format : YYYY-MM-DD

  try {
    // Charger les musiques depuis l'API
    const response = await fetch("https://calendrier-backend.onrender.com/musics?cache-buster=" + Date.now());
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const musics = await response.json();

    // Créer 24 cases pour le calendrier
    for (let i = 1; i <= 24; i++) {
      const day = document.createElement("div");
      const date = `2024-12-${i.toString().padStart(2, "0")}`; // Format YYYY-MM-DD
      day.className = "day";
      day.textContent = i;

      if (date > today || !musics[date] || !musics[date].url) {
        day.classList.add("locked");
        day.addEventListener("click", () => {
          alert("🎅 Oh oh oh ! Pas de chanson pour ce jour !");
        });
      } else {
        day.addEventListener("click", () => {
          window.open(musics[date].url, "_blank");
        });
      }

      calendar.appendChild(day);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des musiques :", error);
    calendar.innerHTML = `<p style="color: red;">Impossible de charger les musiques. Veuillez réessayer plus tard.</p>`;
  }
});
