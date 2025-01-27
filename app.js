const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.SERVER_PORT;
const movies_router = require("./routes/movies_routes");
const midd_error = require("./middleware/midd_error");
const midd_noRoute = require("./middleware/midd_noRoute");

// Rendo disponibile chiamata a server tramite cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

// Rendo disponibile cartella public tramite static
app.use(express.static("public"));

// Middleware per parsing JSON
app.use(express.json());

// Definizione rotta
app.use("/movies", movies_router);

// Middleware globale per gestione errore
app.use(midd_error);

// Middleware per rotte non esistenti
app.use(midd_noRoute);

// Avvio il server
app.listen(port, () => {
  console.log("Server avviato in porta: " + port);
});
