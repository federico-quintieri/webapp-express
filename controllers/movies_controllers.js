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

const reviewStore = async (req, res) => {
  // Prendiamo dati dalla richiesta
  const movieId = parseInt(req.params.id);
  const { name, vote, text } = req.body;
  console.log(movieId, name, vote, text);

  // Validazione voto
  if (isNaN(vote) || vote < 0 || vote > 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il voto deve essere valore numerico compreso tra 0 e 5",
    });
  }

  // Validazione nome
  if (name.length <= 3) {
    return res.status(400).json({
      status: "fail",
      message: "Il nome deve essere piu lungo di 3 caratteri",
    });
  }

  // Validazione testo
  if (text && text.length > 0 && text.length < 5) {
    return res.status(400).json({
      status: "fail",
      message: "Il testo deve essere lungo almeno 6 caratteri",
    });
  }

  // Nel try provo a eseguire la query
  try {
    const result = await database.query_storeReview(movieId, name, vote, text);
    return res.status(500).json(result);
  } catch (err) {
    return res.status(400).json({
      status: "Errore",
      error: err,
    });
  }
};

// Esporto le callback per gli endpoint
module.exports = { index, show, reviewStore };
