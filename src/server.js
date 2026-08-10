console.log("USANDO SERVER CORRECTO GYM 123");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const initDB = require("./config/initDB");
const seedData = require("./config/seedData");

const app = express();


const parseNumericFlexible = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const numero = Number(String(value).trim().replace(",", "."));
  return Number.isFinite(numero) ? numero : null;
};

const normalizeHeightCm = (value) => {
  const numero = parseNumericFlexible(value);
  if (!numero || numero <= 0) return null;
  return numero <= 3 ? numero * 100 : numero;
};



const allowedOrigins = [
  "http://localhost:5173",
  "https://gym-cloud-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Bloqueado por CORS:", origin);
      return callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/api", (_req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

app.use((req, res, next) => {
  console.log("➡️ Request:", req.method, req.originalUrl, "Origin:", req.headers.origin);
  next();
});

app.get("/api/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS fecha");

    res.json({
      ok: true,
      mensaje: "Backend OK GYM",
      dbTime: result.rows[0].fecha,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error?.message || "Error desconocido",
      code: error?.code || null,
      detail: error?.detail || null,
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
      tablas: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      musculos: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      ejercicios: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/api/ejercicios/musculo/:musculo", async (req, res) => {
  try {
    const { musculo } = req.params;

    const result = await pool.query(
      `
      SELECT
        e.id,
        e.nombre,
        e.descripcion,
        e.imagen_url,
        e.video_url,
        e.nivel
      FROM ejercicios e
      INNER JOIN ejercicio_musculo em ON em.ejercicio_id = e.id
      INNER JOIN musculos m ON m.id = em.musculo_id
      WHERE LOWER(m.nombre) = LOWER($1)
      ORDER BY e.id ASC
      `,
      [musculo]
    );

    res.json({
      ok: true,
      ejercicios: result.rows || [],
    });
  } catch (error) {
    console.error("Error en ejercicios por músculo:", error);
    res.status(500).json({
      ok: false,
      error: error.message || "Error obteniendo ejercicios",
    });
  }
});

// ==============================
// SOCIOS
// ==============================

app.get("/api/socios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM socios ORDER BY id ASC");

    return res.json({
      ok: true,
      socios: result.rows || [],
    });
  } catch (error) {
    console.error("ERROR_GET_SOCIOS:", error);

    return res.status(500).json({
      ok: false,
      error: error.message || "Error obteniendo socios",
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
        error: "Socio no encontrado",
      });
    }

    res.json({
      ok: true,
      socio: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      meta_nutricional,
      somatotipo,
      nivel_entrenamiento,
      condicion_especial,
      condiciones_especiales,
      restricciones_entrenamiento,
      disciplina_preferida,
      dias_entrenamiento,
    } = req.body;

    if (!nombres || !apellidos) {
      return res.status(400).json({
        ok: false,
        error: "Nombres y apellidos son obligatorios",
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
        estado,
        peso,
        altura,
        nivel_actividad,
        meta_nutricional,
        somatotipo,
        nivel_entrenamiento,
        condicion_especial,
        condiciones_especiales,
        restricciones_entrenamiento,
        disciplina_preferida,
        dias_entrenamiento,
        updated_at
      )
      VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,
        CURRENT_TIMESTAMP
      )
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
        parseNumericFlexible(peso),
        normalizeHeightCm(altura),
        nivel_actividad || null,
        meta_nutricional || null,
        somatotipo || null,
        nivel_entrenamiento || null,
        condicion_especial || "NO",
        condiciones_especiales || null,
        restricciones_entrenamiento || null,
        disciplina_preferida || "Gimnasio",
        dias_entrenamiento ? Number(dias_entrenamiento) : null,
      ]
    );

    res.status(201).json({
      ok: true,
      socio: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      estado,
      peso,
      altura,
      nivel_actividad,
      meta_nutricional,
      somatotipo,
      nivel_entrenamiento,
      condicion_especial,
      condiciones_especiales,
      restricciones_entrenamiento,
      disciplina_preferida,
      dias_entrenamiento,
    } = req.body;

    if (!nombres || !apellidos) {
      return res.status(400).json({
        ok: false,
        error: "Nombres y apellidos son obligatorios",
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
        error: "Socio no encontrado",
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
        meta_nutricional = $14,
        somatotipo = $15,
        nivel_entrenamiento = $16,
        condicion_especial = $17,
        condiciones_especiales = $18,
        restricciones_entrenamiento = $19,
        disciplina_preferida = $20,
        dias_entrenamiento = $21,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $22
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
        parseNumericFlexible(peso),
        normalizeHeightCm(altura),
        nivel_actividad || null,
        meta_nutricional || null,
        somatotipo || null,
        nivel_entrenamiento || null,
        condicion_especial || "NO",
        condiciones_especiales || null,
        restricciones_entrenamiento || null,
        disciplina_preferida || "Gimnasio",
        dias_entrenamiento ? Number(dias_entrenamiento) : null,
        id,
      ]
    );

    res.json({
      ok: true,
      socio: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
        error: "Socio no encontrado",
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
      message: "Socio eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      rutinas: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.post("/api/rutinas", async (req, res) => {
  try {
    const { socio_id, nombre, objetivo, observaciones } = req.body;

    if (!socio_id) {
      return res.status(400).json({
        ok: false,
        error: "El socio es obligatorio",
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
        observaciones || null,
      ]
    );

    res.status(201).json({
      ok: true,
      rutina: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.post("/api/rutina-detalle", async (req, res) => {
  try {
    const {
      rutina_id,
      ejercicio_id,
      series,
      repeticiones,
      peso,
      descanso,
    } = req.body;

    if (!rutina_id || !ejercicio_id) {
      return res.status(400).json({
        ok: false,
        error: "Rutina y ejercicio son obligatorios",
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
        descanso || "60 seg",
      ]
    );

    res.status(201).json({
      ok: true,
      detalle: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
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
      detalles: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});


// ==============================
// MEMBRESÍAS Y PAGOS
// ==============================

app.get("/api/pagos/socio/:socioId", async (req, res) => {
  try {
    const { socioId } = req.params;
    const result = await pool.query(
      `
      SELECT
        p.*,
        m.tipo AS membresia_tipo,
        m.total AS membresia_total
      FROM pagos p
      LEFT JOIN membresias m ON m.id = p.membresia_id
      WHERE p.socio_id = $1
      ORDER BY p.fecha DESC, p.id DESC
      `,
      [socioId]
    );

    res.json({ ok: true, pagos: result.rows || [] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/membresias", async (req, res) => {
  try {
    const {
      socio_id,
      tipo,
      precio,
      descuento,
      fecha_inicio,
      fecha_fin,
      observaciones,
    } = req.body;

    if (!socio_id || !tipo) {
      return res.status(400).json({ ok: false, error: "Socio y tipo de membresía son obligatorios" });
    }

    const precioNum = Number(precio || 0);
    const descuentoNum = Number(descuento || 0);
    const total = Math.max(0, precioNum - descuentoNum);

    const result = await pool.query(
      `
      INSERT INTO membresias
      (socio_id, tipo, precio, descuento, total, fecha_inicio, fecha_fin, observaciones)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
        socio_id,
        tipo,
        precioNum,
        descuentoNum,
        total,
        fecha_inicio || null,
        fecha_fin || null,
        observaciones || null,
      ]
    );

    res.status(201).json({ ok: true, membresia: result.rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/pagos", async (req, res) => {
  try {
    const {
      socio_id,
      membresia_id,
      monto,
      metodo,
      referencia,
      tipo,
      observaciones,
    } = req.body;

    if (!socio_id || !metodo || Number(monto) <= 0) {
      return res.status(400).json({ ok: false, error: "Socio, monto y método de pago son obligatorios" });
    }

    const result = await pool.query(
      `
      INSERT INTO pagos
      (socio_id, membresia_id, monto, metodo, referencia, tipo, observaciones)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        socio_id,
        membresia_id || null,
        Number(monto),
        metodo,
        referencia || null,
        tipo || "PAGO",
        observaciones || null,
      ]
    );

    res.status(201).json({ ok: true, pago: result.rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

// ==============================
// 404
// ==============================

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

const PORT = process.env.PORT || 10000;

async function startServer() {
  try {
    await initDB();
    await seedData();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando servidor:", error);
  }
}

startServer();