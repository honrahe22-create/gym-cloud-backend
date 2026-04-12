const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

console.log("DB URL cargada:", connectionString ? "SI" : "NO");

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("error", (err) => {
  console.error("❌ Error inesperado en PostgreSQL:", err);
});

module.exports = pool;