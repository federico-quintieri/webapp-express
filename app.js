const express = require("express");
const app = express();
const port = 3000;
const movies_router = require("./routes/movies_routes");

// Rendo disponibile chiamata a server tramite cors

// Rendo disponibile cartella public tramite static
app.use(express.static("public"));

// Middleware per parsing JSON
app.use(express.json());

// Definizione rotta
app.use("/movies", movies_router);

// Middleware per rotte non esistenti
app.use((req, res, next) => {
    res.status(404).send("Rotta non trovata");
  });

// Avvio il server
app.listen(port, () => {
  console.log("Server avviato in porta: " + port);
});
