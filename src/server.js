console.log("USANDO SERVER CORRECTO GYM 123");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const initDB = require("./config/initDB");
const seedData = require("./config/seedData");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://gym-cloud-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requests sin origin (Postman, navegador directo, Render health checks)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Bloqueado por CORS:", origin);
      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: false,
  })
);

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    ok: true,
    mensaje: "Backend OK GYM"
  });
});

app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS fecha");
    res.json({
      ok: true,
      message: "Conexión a PostgreSQL correcta",
      dbTime: result.rows[0].fecha
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error?.message || "Error desconocido",
      code: error?.code || null,
      detail: error?.detail || null
    });
  }
});

app.get("/api/tablas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    res.json({
      ok: true,
      tablas: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/api/musculos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM musculos
      ORDER BY id ASC
    `);

    res.json({
      ok: true,
      musculos: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/api/ejercicios", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM ejercicios
      ORDER BY id ASC
    `);

    res.json({
      ok: true,
      ejercicios: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/api/ejercicios/musculo/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;

    const result = await pool.query(
      `
      SELECT e.*
      FROM ejercicios e
      INNER JOIN ejercicio_musculo em ON em.ejercicio_id = e.id
      INNER JOIN musculos m ON m.id = em.musculo_id
      WHERE m.nombre = $1
      ORDER BY e.id ASC
      `,
      [nombre]
    );

    res.json({
      ok: true,
      ejercicios: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ==============================
// SOCIOS
// ==============================

app.get("/api/socios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM socios ORDER BY id DESC");

    return res.json({
      ok: true,
      socios: result.rows || [],
    });
  } catch (error) {
    console.error("ERROR_GET_SOCIOS:", error);

    return res.status(500).json({
      ok: false,
      error: {
        name: error?.name || null,
        message: error?.message || null,
        stack: error?.stack || null,
        errors: Array.isArray(error?.errors)
          ? error.errors.map((e) => ({
              name: e?.name || null,
              message: e?.message || null,
              code: e?.code || null,
              errno: e?.errno || null,
              address: e?.address || null,
              port: e?.port || null,
            }))
          : [],
      },
    });
  }
});

app.get("/api/socios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM socios
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({
        ok: false,
        error: "Socio no encontrado"
      });
    }

    res.json({
      ok: true,
      socio: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.post("/api/socios", async (req, res) => {
  try {
    const {
  nombres,
  apellidos,
  cedula,
  telefono,
  email,
  fecha_nacimiento,
  genero,
  objetivo,
  observaciones,
  estado,
  peso,
  altura,
  nivel_actividad,
  meta_nutricional
} = req.body;

    if (!nombres || !apellidos) {
      return res.status(400).json({
        ok: false,
        error: "Nombres y apellidos son obligatorios"
      });
    }

    const result = await pool.query(
  `
  INSERT INTO socios
  (
    nombres,
    apellidos,
    cedula,
    telefono,
    email,
    fecha_nacimiento,
    genero,
    objetivo,
    observaciones,
    peso,
    altura,
    nivel_actividad,
    meta_nutricional
  )
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
  RETURNING *
  `,
  [
    nombres,
    apellidos,
    cedula || null,
    telefono || null,
    email || null,
    fecha_nacimiento || null,
    genero || null,
    objetivo || null,
    observaciones || null,
    peso || null,
    altura || null,
    nivel_actividad || null,
    meta_nutricional || null
  ]
);

    res.status(201).json({
      ok: true,
      socio: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.put("/api/socios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      cedula,
      telefono,
      email,
      fecha_nacimiento,
      genero,
      objetivo,
      observaciones,
      estado
    } = req.body;

    if (!nombres || !apellidos) {
      return res.status(400).json({
        ok: false,
        error: "Nombres y apellidos son obligatorios"
      });
    }

    const existe = await pool.query(
      `
      SELECT id
      FROM socios
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    if (!existe.rows.length) {
      return res.status(404).json({
        ok: false,
        error: "Socio no encontrado"
      });
    }

    const result = await pool.query(
  `
  UPDATE socios
  SET
    nombres = $1,
    apellidos = $2,
    cedula = $3,
    telefono = $4,
    email = $5,
    fecha_nacimiento = $6,
    genero = $7,
    objetivo = $8,
    observaciones = $9,
    estado = $10,
    peso = $11,
    altura = $12,
    nivel_actividad = $13,
    meta_nutricional = $14
  WHERE id = $15
  RETURNING *
  `,
  [
    nombres,
    apellidos,
    cedula || null,
    telefono || null,
    email || null,
    fecha_nacimiento || null,
    genero || null,
    objetivo || null,
    observaciones || null,
    estado || "ACTIVO",
    peso || null,
    altura || null,
    nivel_actividad || null,
    meta_nutricional || null,
    id
  ]
);

    res.json({
      ok: true,
      socio: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.delete("/api/socios/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existe = await pool.query(
      `
      SELECT *
      FROM socios
      WHERE id = $1
      LIMIT 1
      `,
      [id]
    );

    if (!existe.rows.length) {
      return res.status(404).json({
        ok: false,
        error: "Socio no encontrado"
      });
    }

    await pool.query(
      `
      DELETE FROM socios
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      ok: true,
      message: "Socio eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// ==============================
// RUTINAS
// ==============================

app.get("/api/rutinas/socio/:socioId", async (req, res) => {
  try {
    const { socioId } = req.params;

    const result = await pool.query(
      `
      SELECT
        r.id,
        r.socio_id,
        r.nombre,
        r.objetivo,
        r.observaciones,
        r.fecha
      FROM rutinas r
      WHERE r.socio_id = $1
      ORDER BY r.id DESC
      `,
      [socioId]
    );

    res.json({
      ok: true,
      rutinas: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.post("/api/rutinas", async (req, res) => {
  try {
    const { socio_id, nombre, objetivo, observaciones } = req.body;

    if (!socio_id) {
      return res.status(400).json({
        ok: false,
        error: "El socio es obligatorio"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO rutinas (socio_id, nombre, objetivo, observaciones)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        socio_id,
        nombre || "Rutina general",
        objetivo || null,
        observaciones || null
      ]
    );

    res.status(201).json({
      ok: true,
      rutina: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.post("/api/rutina-detalle", async (req, res) => {
  try {
    const { rutina_id, ejercicio_id, series, repeticiones, peso, descanso } = req.body;

    if (!rutina_id || !ejercicio_id) {
      return res.status(400).json({
        ok: false,
        error: "Rutina y ejercicio son obligatorios"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO rutina_detalle
      (rutina_id, ejercicio_id, series, repeticiones, peso, descanso)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        rutina_id,
        ejercicio_id,
        series || 3,
        repeticiones || "12",
        peso || "",
        descanso || "60 seg"
      ]
    );

    res.status(201).json({
      ok: true,
      detalle: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/api/rutina-detalle/:rutinaId", async (req, res) => {
  try {
    const { rutinaId } = req.params;

    const result = await pool.query(
      `
      SELECT
        rd.*,
        e.nombre AS ejercicio_nombre,
        e.descripcion AS ejercicio_descripcion,
        e.imagen_url,
        e.video_url
      FROM rutina_detalle rd
      INNER JOIN ejercicios e ON e.id = rd.ejercicio_id
      WHERE rd.rutina_id = $1
      ORDER BY rd.id ASC
      `,
      [rutinaId]
    );

    res.json({
      ok: true,
      detalles: result.rows
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 10000;

async function startServer() {
  try {
    await initDB();
    await seedData();

   app.get("/api/ejercicios/musculo/:musculo", async (req, res) => {
  try {
    const { musculo } = req.params;

    const mapaMusculos = {
      pecho: ["Pecho alto", "Pecho medio", "Pecho bajo"],
      hombros: ["Hombros"],
      biceps: ["Bíceps"],
      abdomen: ["Abdomen"],
      piernas: ["Cuádriceps", "Pantorrillas", "Pantorrillas posterior", "Isquiotibiales"],
      espalda: ["Espalda alta", "Espalda media", "Espalda baja"],
      triceps: ["Tríceps"],
      gluteos: ["Glúteos"],
    };

    const grupos = mapaMusculos[musculo?.toLowerCase()] || [musculo];

    const result = await pool.query(
      `
      SELECT
        id,
        nombre,
        descripcion,
        musculo_nombre,
        imagen_url
      FROM ejercicios
      WHERE musculo_nombre = ANY($1)
      ORDER BY id ASC
      `,
      [grupos]
    );

    res.json({
      ok: true,
      ejercicios: result.rows || [],
    });
  } catch (error) {
    console.error("Error en GET /api/ejercicios/musculo/:musculo:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Error obteniendo ejercicios",
    });
  }
});

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando servidor:", error);
  }
}

startServer();