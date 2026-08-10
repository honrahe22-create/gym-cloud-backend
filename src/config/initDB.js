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
        somatotipo TEXT,
        nivel_entrenamiento TEXT,
        condicion_especial TEXT,
        condiciones_especiales TEXT,
        restricciones_entrenamiento TEXT,
        disciplina_preferida TEXT,
        dias_entrenamiento INTEGER,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE socios ADD COLUMN IF NOT EXISTS peso NUMERIC(10,2);
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS altura NUMERIC(10,2);
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS nivel_actividad TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS meta_nutricional TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS somatotipo TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS nivel_entrenamiento TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS condicion_especial TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS condiciones_especiales TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS restricciones_entrenamiento TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS disciplina_preferida TEXT;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS dias_entrenamiento INTEGER;
      ALTER TABLE socios ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

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

      -- =========================================================
      -- BASE PROFESIONAL: DISCIPLINAS
      -- =========================================================
      CREATE TABLE IF NOT EXISTS disciplinas (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL UNIQUE,
        descripcion TEXT,
        estado TEXT DEFAULT 'ACTIVO',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS disciplina_ejercicios (
        id SERIAL PRIMARY KEY,
        disciplina_id INTEGER NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        nivel TEXT,
        categoria TEXT,
        video_url TEXT,
        imagen_url TEXT,
        estado TEXT DEFAULT 'ACTIVO',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS socio_disciplinas (
        id SERIAL PRIMARY KEY,
        socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
        disciplina_id INTEGER NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
        nivel TEXT,
        objetivo TEXT,
        observaciones TEXT,
        fecha_inicio DATE DEFAULT CURRENT_DATE,
        estado TEXT DEFAULT 'ACTIVO'
      );

      INSERT INTO disciplinas (nombre, descripcion)
      VALUES
        ('Gimnasio', 'Entrenamiento de fuerza, hipertrofia y acondicionamiento con pesas'),
        ('Calistenia', 'Entrenamiento progresivo con peso corporal'),
        ('Boxeo', 'Técnica, defensa, combinaciones y acondicionamiento')
      ON CONFLICT (nombre) DO NOTHING;

      -- =========================================================
      -- BASE PROFESIONAL: MEMBRESÍAS Y PAGOS
      -- =========================================================
      CREATE TABLE IF NOT EXISTS membresias (
        id SERIAL PRIMARY KEY,
        socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
        tipo TEXT NOT NULL,
        precio NUMERIC(12,2) NOT NULL DEFAULT 0,
        descuento NUMERIC(12,2) NOT NULL DEFAULT 0,
        total NUMERIC(12,2) NOT NULL DEFAULT 0,
        fecha_inicio DATE DEFAULT CURRENT_DATE,
        fecha_fin DATE,
        estado TEXT DEFAULT 'ACTIVA',
        observaciones TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pagos (
        id SERIAL PRIMARY KEY,
        socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
        membresia_id INTEGER REFERENCES membresias(id) ON DELETE SET NULL,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        monto NUMERIC(12,2) NOT NULL DEFAULT 0,
        metodo TEXT NOT NULL,
        referencia TEXT,
        tipo TEXT DEFAULT 'PAGO',
        observaciones TEXT,
        estado TEXT DEFAULT 'CONFIRMADO'
      );

      CREATE INDEX IF NOT EXISTS idx_socios_cedula ON socios(cedula);
      CREATE INDEX IF NOT EXISTS idx_pagos_socio ON pagos(socio_id);
      CREATE INDEX IF NOT EXISTS idx_membresias_socio ON membresias(socio_id);
    `);

    console.log("✅ Tablas creadas/actualizadas correctamente");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
    throw error;
  }
}

module.exports = initDB;
