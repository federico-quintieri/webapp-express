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

module.exports = {
  query_Index,
  query_Show,
};
