const sql = require("mysql2");
require("dotenv").config();

// Creo connessione a db
const connection = sql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

// Faccio le funzioni per le call al database

// Mostra tutto da una tabella
async function query_Index(table) {
  try {
    const sql = `SELECT * FROM ${table}`;
    const [rows] = await connection.query(sql);
    return rows;
  } catch (err) {
    return { message: "Errore nella query index", error: err };
  }
}

// Mostra tutte le reviews di un film
async function query_ReviewIndex(movieSlug) {
  try {
    const sql = `SELECT reviews.* FROM reviews JOIN movies ON reviews.movie_id = movies.id WHERE movies.slug = ?`;
    const [rows] = await connection.query(sql, [movieSlug]);
    return rows;
  } catch (err) {
    return { message: "Errore nella query index", error: err };
  }
}

// Mostra una row
async function query_Show(slug) {
  try {
    const sql = ` SELECT 
        movies.*,
        IFNULL(AVG(reviews.vote), 0) AS average_vote
      FROM 
        movies
      LEFT JOIN 
        reviews ON movies.id = reviews.movie_id
      WHERE 
        movies.slug = ?
      GROUP BY 
        movies.id;`;
    const [rows] = await connection.query(sql, [slug]);
    if (rows.length === 0) {
      throw { status: 404, message: "Film non trovato" };
    }
    return rows[0];
  } catch (err) {
    return { message: "Errore nella query show", error: err };
  }
}

// Salva in una tabella
async function query_storeReview(movieSlug, name, vote, text) {
  try {
    // Query per selezionare il film in base allo slug
    const sql_Book = `
      SELECT id
      FROM movies
      WHERE slug = ?
    `;
    // Eseguo la query e ottengo il risultato
    const [rows] = await connection.query(sql_Book, [movieSlug]);

    // Se non trovo il film, restituisco errore
    if (rows.length === 0) throw { status: 404, message: "Film non trovato" };

    // Estraggo l'id del film trovato
    const movieId = rows[0].id;

    // Query per inserire la recensione
    const sql_Review = `
      INSERT INTO reviews(movie_id, name, vote, text)
      VALUES (?, ?, ?, ?);
    `;
    // Eseguo la query per aggiungere la recensione
    await connection.query(sql_Review, [movieId, name, vote, text]);

    // Restituisco conferma dell'inserimento
    return "Ho aggiunto la recensione";
  } catch (err) {
    // Restituisco un oggetto di errore
    return { message: "Errore nella query storeReview", error: err };
  }
}

module.exports = {
  query_Index,
  query_Show,
  query_storeReview,
  query_ReviewIndex,
};
