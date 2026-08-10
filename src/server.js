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




const DISCIPLINE_SEED = {
  Calistenia: [
    ["Flexiones inclinadas", "Empuje", "Principiante", "Flexión con apoyo elevado para aprender control escapular y técnica."],
    ["Sentadilla al aire", "Piernas", "Principiante", "Patrón básico de sentadilla usando el peso corporal."],
    ["Plancha frontal", "Core", "Principiante", "Estabilidad del tronco manteniendo alineación corporal."],
    ["Remo australiano", "Tirón", "Principiante", "Tirón horizontal con barra baja, ideal para progresar a dominadas."],
    ["Puente de glúteos", "Piernas", "Principiante", "Extensión de cadera para glúteos y cadena posterior."],
    ["Flexiones clásicas", "Empuje", "Principiante", "Trabajo global de pecho, tríceps, hombro y core."],
    ["Dominada asistida", "Tirón", "Principiante", "Progresión de dominada con asistencia para desarrollar fuerza."],
    ["Fondos asistidos", "Empuje", "Intermedio", "Progresión de fondos enfocada en tríceps, pecho y hombros."],
    ["Zancadas alternas", "Piernas", "Intermedio", "Trabajo unilateral de pierna, equilibrio y estabilidad."],
    ["Hollow body hold", "Core", "Intermedio", "Control del core en posición hueca para habilidades gimnásticas."],
    ["Dominadas estrictas", "Tirón", "Intermedio", "Dominada completa sin impulso con control escapular."],
    ["Fondos en paralelas", "Empuje", "Intermedio", "Empuje vertical para pecho, tríceps y cintura escapular."],
    ["Pike push-up", "Empuje", "Intermedio", "Progresión de empuje vertical hacia handstand push-up."],
    ["L-sit tuck", "Habilidad", "Intermedio", "Progresión de L-sit con rodillas flexionadas."],
    ["Handstand asistido", "Habilidad", "Intermedio", "Equilibrio invertido con apoyo en pared."],
    ["Muscle-up progresión", "Habilidad", "Avanzado", "Transición explosiva de dominada a fondo sobre barra."],
    ["Handstand push-up asistido", "Empuje", "Avanzado", "Empuje vertical invertido con apoyo en pared."],
    ["Front lever tuck", "Habilidad", "Avanzado", "Progresión isométrica de front lever para dorsal y core."],
  ],
  Boxeo: [
    ["Guardia básica", "Técnica", "Principiante", "Posición base, protección del mentón y distribución del peso."],
    ["Desplazamiento adelante y atrás", "Pies", "Principiante", "Trabajo de distancia sin cruzar los pies."],
    ["Jab", "Golpes", "Principiante", "Golpe recto de mano adelantada con retorno rápido a guardia."],
    ["Cross", "Golpes", "Principiante", "Recto de mano atrasada coordinado con rotación de cadera."],
    ["Jab-Cross 1-2", "Combinaciones", "Principiante", "Combinación base para ritmo, distancia y coordinación."],
    ["Sombra técnica 2 minutos", "Sombra", "Principiante", "Ronda de boxeo sin impacto priorizando postura y fluidez."],
    ["Hook delantero", "Golpes", "Intermedio", "Gancho corto con rotación de cadera y control de codo."],
    ["Uppercut trasero", "Golpes", "Intermedio", "Golpe ascendente desde guardia con potencia de piernas y cadera."],
    ["Slip exterior", "Defensa", "Intermedio", "Esquiva corta fuera de la línea del golpe recto."],
    ["Bloqueo y contra 1-2", "Defensa", "Intermedio", "Defensa compacta seguida de respuesta inmediata."],
    ["Combinación 1-2-3", "Combinaciones", "Intermedio", "Jab, cross y hook delantero enlazados con transferencia de peso."],
    ["Saco: potencia 3 x 2 min", "Saco", "Intermedio", "Rondas de potencia controlada manteniendo técnica y respiración."],
    ["Doble jab + cross", "Combinaciones", "Intermedio", "Cambio de ritmo para abrir distancia y finalizar con cross."],
    ["Pivote + contraataque", "Pies", "Intermedio", "Salida angular y respuesta desde una nueva línea."],
    ["Roll bajo hook", "Defensa", "Avanzado", "Movimiento de cintura bajo gancho manteniendo base estable."],
    ["Combinación 1-2-3-2", "Combinaciones", "Avanzado", "Secuencia de cuatro golpes con recuperación de guardia."],
    ["Sombra libre 3 x 3 min", "Sombra", "Avanzado", "Rondas completas con defensa, ángulos, fintas y combinaciones."],
    ["Circuito boxeo HIIT", "Acondicionamiento", "Avanzado", "Intervalos de golpes, desplazamientos y trabajo cardiovascular."],
  ],
};

async function ensureDisciplineModule() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS disciplina_planes (
      id SERIAL PRIMARY KEY,
      socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
      disciplina_id INTEGER NOT NULL REFERENCES disciplinas(id) ON DELETE CASCADE,
      nombre TEXT NOT NULL,
      nivel TEXT,
      objetivo TEXT,
      estado TEXT DEFAULT 'ACTIVO',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS disciplina_plan_detalle (
      id SERIAL PRIMARY KEY,
      plan_id INTEGER NOT NULL REFERENCES disciplina_planes(id) ON DELETE CASCADE,
      ejercicio_id INTEGER NOT NULL REFERENCES disciplina_ejercicios(id) ON DELETE CASCADE,
      series INTEGER DEFAULT 3,
      repeticiones TEXT DEFAULT '10',
      duracion TEXT DEFAULT '',
      descanso TEXT DEFAULT '60 seg',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_disciplina_planes_socio ON disciplina_planes(socio_id);
    CREATE INDEX IF NOT EXISTS idx_disciplina_plan_detalle_plan ON disciplina_plan_detalle(plan_id);
  `);

  for (const [disciplinaNombre, ejercicios] of Object.entries(DISCIPLINE_SEED)) {
    const disciplinaRes = await pool.query(
      `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [disciplinaNombre]
    );

    if (!disciplinaRes.rows.length) continue;
    const disciplinaId = disciplinaRes.rows[0].id;

    for (const [nombre, categoria, nivel, descripcion] of ejercicios) {
      const existe = await pool.query(
        `
        SELECT id FROM disciplina_ejercicios
        WHERE disciplina_id = $1 AND LOWER(nombre) = LOWER($2)
        LIMIT 1
        `,
        [disciplinaId, nombre]
      );

      if (!existe.rows.length) {
        await pool.query(
          `
          INSERT INTO disciplina_ejercicios
          (disciplina_id, nombre, descripcion, nivel, categoria, video_url, imagen_url)
          VALUES ($1,$2,$3,$4,$5,$6,$7)
          `,
          [disciplinaId, nombre, descripcion, nivel, categoria, "", ""]
        );
      }
    }
  }


  const calisteniaRes = await pool.query(
    `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER('Calistenia') LIMIT 1`
  );

  if (calisteniaRes.rows.length) {
    const disciplinaId = calisteniaRes.rows[0].id;

    const reemplazos = [
      ["Hollow body hold", "V-Up", "Core", "Intermedio", "Flexión dinámica de tronco y piernas para fortalecer el core."],
      ["Pike push-up", "Flexiones cerradas", "Empuje", "Intermedio", "Flexión con agarre cerrado para reforzar tríceps, pecho y control corporal."],
      ["L-sit tuck", "Elevación vertical de piernas", "Core", "Intermedio", "Elevación de piernas en paralelas para core y flexores de cadera."],
      ["Handstand asistido", "Plancha lateral", "Core", "Intermedio", "Estabilidad lateral para mejorar control corporal y cintura escapular."],
      ["Muscle-up progresión", "Dominada commando", "Tirón", "Avanzado", "Dominada avanzada con agarre alterno para fuerza de tirón y control."],
      ["Handstand push-up asistido", "Fondos escapulares", "Empuje", "Avanzado", "Trabajo avanzado de control escapular y estabilidad de hombros."],
      ["Front lever tuck", "Dominada supina", "Tirón", "Avanzado", "Dominada supina avanzada para dorsal, bíceps y control corporal."],
    ];

    for (const [anterior, nuevo, categoria, nivel, descripcion] of reemplazos) {
      await pool.query(
        `
        UPDATE disciplina_ejercicios
        SET nombre = $1,
            categoria = $2,
            nivel = $3,
            descripcion = $4
        WHERE disciplina_id = $5
          AND LOWER(nombre) = LOWER($6)
        `,
        [nuevo, categoria, nivel, descripcion, disciplinaId, anterior]
      );
    }
  }

  console.log("✅ Módulos Calistenia y Boxeo preparados");
}

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
// CALISTENIA Y BOXEO
// ==============================

app.get("/api/disciplinas", async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM disciplinas WHERE estado = 'ACTIVO' ORDER BY id ASC`
    );
    res.json({ ok: true, disciplinas: result.rows || [] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/disciplinas/:nombre/ejercicios", async (req, res) => {
  try {
    const { nombre } = req.params;
    const { nivel } = req.query;

    const params = [nombre];
    let filtroNivel = "";
    if (nivel && nivel !== "Todos") {
      params.push(nivel);
      filtroNivel = `AND LOWER(de.nivel) = LOWER($2)`;
    }

    const result = await pool.query(
      `
      SELECT
        de.id,
        de.nombre,
        de.descripcion,
        de.nivel,
        de.categoria,
        de.video_url,
        de.imagen_url,
        d.nombre AS disciplina
      FROM disciplina_ejercicios de
      INNER JOIN disciplinas d ON d.id = de.disciplina_id
      WHERE LOWER(d.nombre) = LOWER($1)
        AND de.estado = 'ACTIVO'
        ${filtroNivel}
      ORDER BY
        CASE de.nivel
          WHEN 'Principiante' THEN 1
          WHEN 'Intermedio' THEN 2
          WHEN 'Avanzado' THEN 3
          ELSE 4
        END,
        de.id ASC
      `,
      params
    );

    res.json({ ok: true, ejercicios: result.rows || [] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/planes-disciplina/socio/:socioId", async (req, res) => {
  try {
    const { socioId } = req.params;
    const result = await pool.query(
      `
      SELECT
        dp.*,
        d.nombre AS disciplina
      FROM disciplina_planes dp
      INNER JOIN disciplinas d ON d.id = dp.disciplina_id
      WHERE dp.socio_id = $1
      ORDER BY dp.id DESC
      `,
      [socioId]
    );

    res.json({ ok: true, planes: result.rows || [] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/planes-disciplina", async (req, res) => {
  try {
    const { socio_id, disciplina, nombre, nivel, objetivo } = req.body;

    if (!socio_id || !disciplina) {
      return res.status(400).json({
        ok: false,
        error: "Socio y disciplina son obligatorios",
      });
    }

    const disciplinaRes = await pool.query(
      `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [disciplina]
    );

    if (!disciplinaRes.rows.length) {
      return res.status(404).json({ ok: false, error: "Disciplina no encontrada" });
    }

    const result = await pool.query(
      `
      INSERT INTO disciplina_planes
      (socio_id, disciplina_id, nombre, nivel, objetivo)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        socio_id,
        disciplinaRes.rows[0].id,
        nombre || `Plan ${disciplina}`,
        nivel || "Principiante",
        objetivo || null,
      ]
    );

    res.status(201).json({
      ok: true,
      plan: { ...result.rows[0], disciplina },
    });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/planes-disciplina/:planId/detalle", async (req, res) => {
  try {
    const { planId } = req.params;
    const result = await pool.query(
      `
      SELECT
        dpd.*,
        de.nombre AS ejercicio_nombre,
        de.descripcion AS ejercicio_descripcion,
        de.nivel,
        de.categoria,
        de.video_url,
        de.imagen_url
      FROM disciplina_plan_detalle dpd
      INNER JOIN disciplina_ejercicios de ON de.id = dpd.ejercicio_id
      WHERE dpd.plan_id = $1
      ORDER BY dpd.id ASC
      `,
      [planId]
    );

    res.json({ ok: true, detalles: result.rows || [] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/planes-disciplina/:planId/ejercicios", async (req, res) => {
  try {
    const { planId } = req.params;
    const {
      ejercicio_id,
      series,
      repeticiones,
      duracion,
      descanso,
    } = req.body;

    if (!ejercicio_id) {
      return res.status(400).json({ ok: false, error: "Ejercicio obligatorio" });
    }

    const duplicado = await pool.query(
      `
      SELECT id FROM disciplina_plan_detalle
      WHERE plan_id = $1 AND ejercicio_id = $2
      LIMIT 1
      `,
      [planId, ejercicio_id]
    );

    if (duplicado.rows.length) {
      return res.status(409).json({
        ok: false,
        error: "Este ejercicio ya está agregado al plan",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO disciplina_plan_detalle
      (plan_id, ejercicio_id, series, repeticiones, duracion, descanso)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        planId,
        ejercicio_id,
        series || 3,
        repeticiones || "10",
        duracion || "",
        descanso || "60 seg",
      ]
    );

    res.status(201).json({ ok: true, detalle: result.rows[0] });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
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
    await ensureDisciplineModule();
    await seedData();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando servidor:", error);
  }
}

startServer();
