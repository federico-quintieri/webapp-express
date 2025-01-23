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
async function query_Show(id) {
  try {
    const sql = `SELECT * FROM movies WHERE id = ?`;
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
  } catch (err) {
    return { message: "Errore nella query show", error: err };
  }
}

module.exports = {
  query_Index,
  query_Show,
};
