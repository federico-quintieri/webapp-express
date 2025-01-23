// Importo le funzioni per chiamate a db
const database = require("../db");

// Callback per index
const index = async (req, res) => {
  try {
    // Chiama la funzione query_Index dal modulo del database
    const movies = await database.query_Index();
    // Invia i film come risposta JSON
    res.json(movies);
  } catch (error) {
    console.error("Errore nel recupero dei film:", error);
    res.status(500).json({
      message: "Errore nel recuperare i film dal database",
      error: error.message,
    });
  }
};

// Callback per show
const show = async (req, res) => {
  const url_ID = parseInt(req.params.id);
  try {
    // Chiama la funzione query_Index dal modulo del database
    const movie = await database.query_Show(url_ID);
    // Invia il film come risposta JSON
    res.json(movie);
  } catch (error) {
    console.error("Errore nel recupero del film:", error);
    res.status(500).json({
      message: "Errore nel recuperare il film dal database",
      error: error.message,
    });
  }
};

// Esporto le callback per gli endpoint
module.exports = { index, show };
