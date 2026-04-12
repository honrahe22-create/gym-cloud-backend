const pool = require("./db");

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS socios (
        id SERIAL PRIMARY KEY,
        nombres TEXT NOT NULL,
        apellidos TEXT NOT NULL,
        cedula TEXT UNIQUE,
        telefono TEXT,
        email TEXT,
        fecha_nacimiento DATE,
        genero TEXT,
        objetivo TEXT,
        observaciones TEXT,
        estado TEXT DEFAULT 'ACTIVO',
        peso NUMERIC(10,2),
        altura NUMERIC(10,2),
        nivel_actividad TEXT,
        meta_nutricional TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE socios ADD COLUMN IF NOT EXISTS peso NUMERIC(10,2);
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS altura NUMERIC(10,2);
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS nivel_actividad TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS meta_nutricional TEXT;

      CREATE TABLE IF NOT EXISTS musculos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL UNIQUE,
        vista TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ejercicios (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        imagen_url TEXT,
        video_url TEXT,
        nivel TEXT,
        estado TEXT DEFAULT 'ACTIVO',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS ejercicio_musculo (
        id SERIAL PRIMARY KEY,
        ejercicio_id INTEGER NOT NULL REFERENCES ejercicios(id) ON DELETE CASCADE,
        musculo_id INTEGER NOT NULL REFERENCES musculos(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS rutinas (
        id SERIAL PRIMARY KEY,
        socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
        nombre TEXT,
        objetivo TEXT,
        observaciones TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS rutina_detalle (
        id SERIAL PRIMARY KEY,
        rutina_id INTEGER NOT NULL REFERENCES rutinas(id) ON DELETE CASCADE,
        ejercicio_id INTEGER NOT NULL REFERENCES ejercicios(id) ON DELETE CASCADE,
        series INTEGER DEFAULT 3,
        repeticiones TEXT DEFAULT '12',
        peso TEXT DEFAULT '',
        descanso TEXT DEFAULT '60 seg'
      );
    `);

    console.log("✅ Tablas creadas/actualizadas correctamente");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
  }
}

module.exports = initDB;