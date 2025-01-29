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

// Mostra tutte le row
async function query_Index() {
  try {
    const sql = `SELECT * FROM movies`;
    const [rows] = await connection.query(sql);
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

// Salva in un una tabella
async function query_storeReview(id, name, vote, text) {
  try {
    // Faccio query per selezionare il libro in base ad id
    const sql_Book = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;
    // Invio questa query e ottengo il risultato con un check
    const [rows] = await connection.query(sql_Book, [id]);
    if (rows.length === 0) throw { status: 404, message: "Film non trovato" };

    // Se ho selezionato un libro posso aggiungere una recensione
    const sql_Review = `
    INSERT INTO reviews(movie_id, name, vote, text)
    VALUES (?, ?, ?, ?);
  `;
    // Invio la query per aggiungere la recensione
    const result = connection.query(sql_Review, [id, name, vote, text]);

    // Ritornami il result
    return result && "Ho aggiunto la recensione";
  } catch (err) {
    // Se invece c'è un errore lo restituisco in un oggetto
    return { message: "Errore nella query storeReview", error: err };
  }
}

module.exports = {
  query_Index,
  query_Show,
  query_storeReview,
};
