const express = require("express");
const app = express();
const port = 3000;
const movies_router = require("./routes/movies_routes");
const middleware_no_route = require("./middleware/no_route");

// Rendo disponibile chiamata a server tramite cors

// Rendo disponibile cartella public tramite static
app.use(express.static("public"));

// Middleware per parsing JSON
app.use(express.json());

// Definizione rotta
app.use("/movies", movies_router);

// Middleware da eseguire globale se rotta non esiste
app.use(middleware_no_route);

// Avvio il server
app.listen(port, () => {
  console.log("Server avviato in porta: " + port);
});
