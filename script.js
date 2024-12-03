document.addEventListener("DOMContentLoaded", async () => {
    const calendar = document.getElementById("calendar");
    const today = new Date().toISOString().split("T")[0]; // Format : YYYY-MM-DD
  
    // Charger les musiques depuis le fichier JSON
    const response = await fetch("musics.json");
    const musics = await response.json();
  
    // Créer 24 cases pour le calendrier
    for (let i = 1; i <= 24; i++) {
      const day = document.createElement("div");
      const date = `2024-12-${i.toString().padStart(2, "0")}`; // Format YYYY-MM-DD
      day.className = "day";
      day.textContent = i;
  
      if (date > today || !musics[date] || !musics[date].url) {
        day.classList.add("locked");
      } else {
        day.addEventListener("click", () => {
          window.open(musics[date].url, "_blank");
        });
      }
  
      calendar.appendChild(day);
    }
  });
  
