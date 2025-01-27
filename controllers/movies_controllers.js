// Importo le funzioni per chiamate a db
const database = require("../db");

// Callback per index
const index = async (req, res) => {
  try {
    // Prendo query object
    const filters = req.query;

    // Chiama la funzione query_Index dal modulo del database
    const movies = await database.query_Index();
    // Invia i film come risposta JSON
    res.json(movies);
  } catch (error) {
    console.error("Errore nel recupero dei film:", error);
    next(error); // Passo errore al middleware
  }
};

// Callback per show
const show = async (req, res) => {
  const url_Slug = req.params.slug;
  try {
    // Chiama la funzione query_Index dal modulo del database
    const movie = await database.query_Show(url_Slug);
    // Invia il film come risposta JSON
    res.json(movie);
  } catch (error) {
    console.error("Errore nel recupero del film:", error);
    next(error); // Passo l'errore al middleware
  }
};

// Esporto le callback per gli endpoint
module.exports = { index, show };
