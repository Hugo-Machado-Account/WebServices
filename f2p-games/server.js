const express = require("express");

const app = express();
const port = 8000;

app.use(express.json());

const base_api = "https://www.freetogame.com/api";

let gamesData = [];

fetch(`${base_api}/games`)
  .then((result) => result.json())
  .then((json) => {
    gamesData = json;
    console.log("Données de jeux chargées avec succès");
  })
  .catch((err) => console.error("Erreur lors du chargement des jeux:", err));

app.get("/games", (game_id, result) => {
    result.json(gamesData);
});

app.get("/games/:id", (game_id, result) => {
  const gameId = game_id.params.id;
  const game = gamesData.find((game) => game.id == gameId);

  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ error: "Jeu non trouvé." });
  }
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});