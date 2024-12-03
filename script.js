document.addEventListener("DOMContentLoaded", async () => {
  const calendar = document.getElementById("calendar");
  const today = new Date().toISOString().split("T")[0]; // Format : YYYY-MM-DD

  // Charger les musiques depuis le backend
  const response = await fetch("https://calendrier-backend.onrender.com/musics?cache-buster=" + Date.now());
  const musics = await response.json();

  // Créer 24 cases pour le calendrier
  for (let i = 1; i <= 24; i++) {
    const day = document.createElement("div");
    const date = `2024-12-${i.toString().padStart(2, "0")}`; // Format YYYY-MM-DD
    day.className = "day";
    day.textContent = i;

    if (date > today) {
      // Case future
      day.classList.add("locked");
    } else if (!musics[date] || !musics[date].url) {
      // Pas de musique pour ce jour
      day.classList.add("locked");
      day.addEventListener("click", () => {
        alert("🎅 Oh oh oh ! Raph doit encore choisir une chanson pour aujourd'hui ! Les lutins sont en train de préparer quelque chose de spécial. 🎁");
      });
    } else {
      // Case déverrouillée avec une musique
      day.classList.add("unlocked");
      day.addEventListener("click", () => {
        window.open(musics[date].url, "_blank");
      });
    }

    calendar.appendChild(day);
  }
});
