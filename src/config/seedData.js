const pool = require("./db");
const fs = require("fs");
const path = require("path");

async function seedData() {
  try {
    console.log("🌱 Verificando datos base del GYM...");

    // =========================================================
    // 1. MÚSCULOS
    // =========================================================

    const musculos = [
      { nombre: "Pecho alto", vista: "front" },
      { nombre: "Pecho medio", vista: "front" },
      { nombre: "Pecho bajo", vista: "front" },
      { nombre: "Hombros", vista: "front" },
      { nombre: "Bíceps", vista: "front" },
      { nombre: "Abdomen", vista: "front" },
      { nombre: "Cuádriceps", vista: "front" },
      { nombre: "Pantorrillas", vista: "front" },

      { nombre: "Trapecio", vista: "back" },
      { nombre: "Espalda alta", vista: "back" },
      { nombre: "Espalda media", vista: "back" },
      { nombre: "Espalda baja", vista: "back" },
      { nombre: "Tríceps", vista: "back" },
      { nombre: "Glúteos", vista: "back" },
      { nombre: "Isquiotibiales", vista: "back" },
      { nombre: "Pantorrillas posterior", vista: "back" },
    ];

    for (const musculo of musculos) {
      await pool.query(
        `
        INSERT INTO musculos (nombre, vista)
        VALUES ($1, $2)
        ON CONFLICT (nombre)
        DO UPDATE SET vista = EXCLUDED.vista
        `,
        [musculo.nombre, musculo.vista]
      );
    }

    // =========================================================
    // 2. EJERCICIOS
    // descripcion = músculo principal
    // video_url apunta al FRONTEND:
    // frontend/public/videos/
    // =========================================================

    const ejercicios = [
      // =======================================================
      // PECHO ALTO
      // =======================================================

      {
        nombre: 'Barbell Incline Bench Press',
        descripcion: 'Pecho alto',
        video_url: '/videos/pecho-alto-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Incline Fly',
        descripcion: 'Pecho alto',
        video_url: '/videos/pecho-alto-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Incline Fly On Exercise Ball',
        descripcion: 'Pecho alto',
        video_url: '/videos/pecho-alto-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Incline Bench Press',
        descripcion: 'Pecho alto',
        video_url: '/videos/pecho-alto-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Incline Hammer Press',
        descripcion: 'Pecho alto',
        video_url: '/videos/pecho-alto-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // PECHO MEDIO
      // =======================================================

      {
        nombre: 'Barbell Bench Press',
        descripcion: 'Pecho medio',
        video_url: '/videos/pecho-medio-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Standing Fly',
        descripcion: 'Pecho medio',
        video_url: '/videos/pecho-medio-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Deep Push-Up',
        descripcion: 'Pecho medio',
        video_url: '/videos/pecho-medio-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Fly',
        descripcion: 'Pecho medio',
        video_url: '/videos/pecho-medio-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Fly On Exercise Ball',
        descripcion: 'Pecho medio',
        video_url: '/videos/pecho-medio-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // PECHO BAJO
      // =======================================================

      {
        nombre: 'Barbell Decline Bench Press',
        descripcion: 'Pecho bajo',
        video_url: '/videos/pecho-bajo-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Chest Dips',
        descripcion: 'Pecho bajo',
        video_url: '/videos/pecho-bajo-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Decline Dumbbell Bench Press',
        descripcion: 'Pecho bajo',
        video_url: '/videos/pecho-bajo-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Decline Dumbbell Fly',
        descripcion: 'Pecho bajo',
        video_url: '/videos/pecho-bajo-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Standing Fly',
        descripcion: 'Pecho bajo',
        video_url: '/videos/pecho-bajo-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // HOMBROS
      // =======================================================

      {
        nombre: 'Band Bent-Over Rear Lateral Raise',
        descripcion: 'Hombros',
        video_url: '/videos/hombros-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band One Arm Front Raise',
        descripcion: 'Hombros',
        video_url: '/videos/hombros-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Front Raise',
        descripcion: 'Hombros',
        video_url: '/videos/hombros-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Wide-Grip Upright Row',
        descripcion: 'Hombros',
        video_url: '/videos/hombros-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Lateral Raise',
        descripcion: 'Hombros',
        video_url: '/videos/hombros-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // BÍCEPS
      // =======================================================

      {
        nombre: 'Barbell Curl',
        descripcion: 'Bíceps',
        video_url: '/videos/biceps-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Drag Curl',
        descripcion: 'Bíceps',
        video_url: '/videos/biceps-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Prone Incline Curl',
        descripcion: 'Bíceps',
        video_url: '/videos/biceps-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable One Arm Curl',
        descripcion: 'Bíceps',
        video_url: '/videos/biceps-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Standing Inner Curl',
        descripcion: 'Bíceps',
        video_url: '/videos/biceps-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // ABDOMEN
      // =======================================================

      {
        nombre: '45-Degree Bicycle Twisting Crunch',
        descripcion: 'Abdomen',
        video_url: '/videos/abdomen-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Resisted Decline Sit-Up',
        descripcion: 'Abdomen',
        video_url: '/videos/abdomen-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Side Bend',
        descripcion: 'Abdomen',
        video_url: '/videos/abdomen-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Standing Crunch',
        descripcion: 'Abdomen',
        video_url: '/videos/abdomen-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Bench Crunch',
        descripcion: 'Abdomen',
        video_url: '/videos/abdomen-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // CUÁDRICEPS
      // =======================================================

      {
        nombre: 'Barbell Back Squat',
        descripcion: 'Cuádriceps',
        video_url: '/videos/cuadriceps-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Front Squat',
        descripcion: 'Cuádriceps',
        video_url: '/videos/cuadriceps-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Lever Horizontal Leg Press',
        descripcion: 'Cuádriceps',
        video_url: '/videos/cuadriceps-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Sled Hack Squat',
        descripcion: 'Cuádriceps',
        video_url: '/videos/cuadriceps-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Smith Machine Leg Press',
        descripcion: 'Cuádriceps',
        video_url: '/videos/cuadriceps-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // PANTORRILLAS FRONTAL
      // =======================================================

      {
        nombre: 'Band Standing Calf Raise',
        descripcion: 'Pantorrillas',
        video_url: '/videos/pantorrillas-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Donkey Calf Raise',
        descripcion: 'Pantorrillas',
        video_url: '/videos/pantorrillas-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Seated Calf Raise',
        descripcion: 'Pantorrillas',
        video_url: '/videos/pantorrillas-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Single Leg Calf Raise',
        descripcion: 'Pantorrillas',
        video_url: '/videos/pantorrillas-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Standing Calf Raise',
        descripcion: 'Pantorrillas',
        video_url: '/videos/pantorrillas-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA ALTA
      // =======================================================

      {
        nombre: 'Band Assisted Pull-up',
        descripcion: 'Espalda alta',
        video_url: '/videos/espalda-alta-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Kneeling One Arm Pulldown',
        descripcion: 'Espalda alta',
        video_url: '/videos/espalda-alta-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Bench Pull-Up',
        descripcion: 'Espalda alta',
        video_url: '/videos/espalda-alta-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Close Grip Lat Pulldown',
        descripcion: 'Espalda alta',
        video_url: '/videos/espalda-alta-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable One Arm Lateral Pulldown',
        descripcion: 'Espalda alta',
        video_url: '/videos/espalda-alta-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA MEDIA
      // =======================================================

      {
        nombre: 'Band Seated Row',
        descripcion: 'Espalda media',
        video_url: '/videos/espalda-media-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Straight-Back Seated Row',
        descripcion: 'Espalda media',
        video_url: '/videos/espalda-media-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Underhand Bent-Over Row',
        descripcion: 'Espalda media',
        video_url: '/videos/espalda-media-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable One-Arm Twisting Seated Row',
        descripcion: 'Espalda media',
        video_url: '/videos/espalda-media-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Seated High Row (V-bar)',
        descripcion: 'Espalda media',
        video_url: '/videos/espalda-media-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA BAJA
      // =======================================================

      {
        nombre: '45 Degree Hyperextension',
        descripcion: 'Espalda baja',
        video_url: '/videos/espalda-baja-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Kettlebell Deadlift',
        descripcion: 'Espalda baja',
        video_url: '/videos/espalda-baja-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Lever Back Extension',
        descripcion: 'Espalda baja',
        video_url: '/videos/espalda-baja-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Single Dumbbell Stiff-Leg Deadlift',
        descripcion: 'Espalda baja',
        video_url: '/videos/espalda-baja-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Smith Machine Deadlift',
        descripcion: 'Espalda baja',
        video_url: '/videos/espalda-baja-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // TRÍCEPS
      // =======================================================

      {
        nombre: 'Band Overhead Triceps Extension',
        descripcion: 'Tríceps',
        video_url: '/videos/triceps-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Triceps Pushdown',
        descripcion: 'Tríceps',
        video_url: '/videos/triceps-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Barbell Close Grip Bench Press',
        descripcion: 'Tríceps',
        video_url: '/videos/triceps-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Bench Dips',
        descripcion: 'Tríceps',
        video_url: '/videos/triceps-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Cable Lying Triceps Extension',
        descripcion: 'Tríceps',
        video_url: '/videos/triceps-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // GLÚTEOS
      // =======================================================

      {
        nombre: 'Band Hip Abduction',
        descripcion: 'Glúteos',
        video_url: '/videos/gluteos-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Sumo Squat',
        descripcion: 'Glúteos',
        video_url: '/videos/gluteos-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Glute Bridge',
        descripcion: 'Glúteos',
        video_url: '/videos/gluteos-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Lever Seated Hip Abduction',
        descripcion: 'Glúteos',
        video_url: '/videos/gluteos-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Lever Standing Hip Extension',
        descripcion: 'Glúteos',
        video_url: '/videos/gluteos-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // ISQUIOTIBIALES
      // =======================================================

      {
        nombre: 'Band Prone Leg Curl',
        descripcion: 'Isquiotibiales',
        video_url: '/videos/isquiotibiales-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Band Standing Leg Curl',
        descripcion: 'Isquiotibiales',
        video_url: '/videos/isquiotibiales-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Lying Leg Curl',
        descripcion: 'Isquiotibiales',
        video_url: '/videos/isquiotibiales-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Stiff Leg Deadlift',
        descripcion: 'Isquiotibiales',
        video_url: '/videos/isquiotibiales-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Lever Kneeling Leg Curl',
        descripcion: 'Isquiotibiales',
        video_url: '/videos/isquiotibiales-5.mp4',
        nivel: "Intermedio",
      },

      // =======================================================
      // PANTORRILLAS POSTERIOR
      // =======================================================

      {
        nombre: 'Band Standing Calf Raise (Posterior)',
        descripcion: 'Pantorrillas posterior',
        video_url: '/videos/pantorrillas-posterior-1.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Donkey Calf Raise (Posterior)',
        descripcion: 'Pantorrillas posterior',
        video_url: '/videos/pantorrillas-posterior-2.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Seated Calf Raise (Posterior)',
        descripcion: 'Pantorrillas posterior',
        video_url: '/videos/pantorrillas-posterior-3.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Single Leg Calf Raise (Posterior)',
        descripcion: 'Pantorrillas posterior',
        video_url: '/videos/pantorrillas-posterior-4.mp4',
        nivel: "Intermedio",
      },
      {
        nombre: 'Dumbbell Standing Calf Raise (Posterior)',
        descripcion: 'Pantorrillas posterior',
        video_url: '/videos/pantorrillas-posterior-5.mp4',
        nivel: "Intermedio",
      },

    ];

    // =========================================================
    // 3. RECUPERACIÓN DEL CATÁLOGO GYM 30
    // =========================================================
    // Prioridad de recuperación:
    // 1) gym30-generated.json, si está presente.
    // 2) ejercicios que YA EXISTEN en PostgreSQL (aunque se haya perdido
    //    la relación ejercicio_musculo).
    // 3) catálogo base de este archivo como respaldo.
    //
    // IMPORTANTE: no borra ejercicios ni rutinas. Solo reconstruye las
    // relaciones de cada músculo con un máximo de 30 ejercicios.

    const normalizar = (valor = "") =>
      String(valor)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const gym30Path = path.join(__dirname, "gym30-generated.json");
    let catalogoManifest = [];

    if (fs.existsSync(gym30Path)) {
      try {
        const gym30 = JSON.parse(fs.readFileSync(gym30Path, "utf8"));
        const generados = Array.isArray(gym30?.ejercicios) ? gym30.ejercicios : [];

        catalogoManifest = generados
          .filter((e) => e && e.nombre && e.descripcion)
          .map((e) => ({
            nombre: e.nombre,
            descripcion: e.descripcion,
            video_url: e.video_url || "",
            imagen_url: e.imagen_url || "",
            nivel: e.nivel || "Intermedio",
          }));

        console.log(
          `✅ gym30-generated.json detectado: ${catalogoManifest.length} ejercicios.`
        );
      } catch (errorManifest) {
        console.error(
          "⚠️ No se pudo leer gym30-generated.json:",
          errorManifest.message
        );
      }
    } else {
      console.log(
        "ℹ️ gym30-generated.json no está presente. Se intentará recuperar el catálogo desde PostgreSQL."
      );
    }

    // El manifest tiene prioridad. Si no está, conservamos el catálogo base
    // para asegurar que nunca quede un músculo completamente vacío.
    const ejerciciosParaInsertar = catalogoManifest.length
      ? catalogoManifest
      : ejercicios.map((e) => ({
          ...e,
          imagen_url: e.imagen_url || "",
        }));

    // =========================================================
    // 4. INSERTAR / ACTUALIZAR EL CATÁLOGO DISPONIBLE SIN DUPLICAR
    // =========================================================

    for (const ejercicio of ejerciciosParaInsertar) {
      const existente = await pool.query(
        `
        SELECT id
        FROM ejercicios
        WHERE LOWER(nombre) = LOWER($1)
        ORDER BY id ASC
        LIMIT 1
        `,
        [ejercicio.nombre]
      );

      if (existente.rows.length > 0) {
        // Solo sobrescribimos medios cuando el nuevo catálogo trae un valor.
        // Esto evita perder una animación que ya estaba guardada en PostgreSQL.
        await pool.query(
          `
          UPDATE ejercicios
          SET descripcion = COALESCE(NULLIF($1, ''), descripcion),
              imagen_url = COALESCE(NULLIF($2, ''), imagen_url),
              video_url = COALESCE(NULLIF($3, ''), video_url),
              nivel = COALESCE(NULLIF($4, ''), nivel),
              estado = 'ACTIVO'
          WHERE id = $5
          `,
          [
            ejercicio.descripcion || "",
            ejercicio.imagen_url || "",
            ejercicio.video_url || "",
            ejercicio.nivel || "Intermedio",
            existente.rows[0].id,
          ]
        );
      } else {
        await pool.query(
          `
          INSERT INTO ejercicios
            (nombre, descripcion, imagen_url, video_url, nivel, estado)
          VALUES
            ($1, $2, $3, $4, $5, 'ACTIVO')
          `,
          [
            ejercicio.nombre,
            ejercicio.descripcion || "",
            ejercicio.imagen_url || "",
            ejercicio.video_url || "",
            ejercicio.nivel || "Intermedio",
          ]
        );
      }
    }

    // =========================================================
    // 5. RECUPERAR EJERCICIOS OCULTOS / DESRELACIONADOS DE POSTGRESQL
    // =========================================================
    // En ajustes anteriores podían quedar los ejercicios en la tabla
    // "ejercicios", pero desaparecer de la pantalla porque se perdían las
    // filas de "ejercicio_musculo". Aquí recuperamos esas filas existentes.

    const dbEjerciciosRes = await pool.query(`
      SELECT
        id,
        nombre,
        descripcion,
        imagen_url,
        video_url,
        nivel,
        estado
      FROM ejercicios
      WHERE COALESCE(estado, 'ACTIVO') = 'ACTIVO'
      ORDER BY id ASC
    `);

    const todosEjerciciosDB = dbEjerciciosRes.rows || [];
    const resumenRecuperacion = {};

    for (const musculo of musculos) {
      const musculoRes = await pool.query(
        `SELECT id FROM musculos WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
        [musculo.nombre]
      );

      if (!musculoRes.rows.length) {
        console.warn(`⚠️ No se encontró el músculo ${musculo.nombre}.`);
        continue;
      }

      const musculoId = musculoRes.rows[0].id;
      const claveMusculo = normalizar(musculo.nombre);

      const candidatos = [];
      const usados = new Set();

      const agregarCandidato = (ejercicio, prioridad = 2) => {
        if (!ejercicio?.id || !ejercicio?.nombre) return;
        const claveNombre = normalizar(ejercicio.nombre);
        if (!claveNombre || usados.has(claveNombre)) return;
        usados.add(claveNombre);
        candidatos.push({ ...ejercicio, prioridad });
      };

      // 5.1 Si existe manifest, sus nombres son la fuente autoritativa.
      if (catalogoManifest.length) {
        const nombresManifest = new Set(
          catalogoManifest
            .filter((e) => normalizar(e.descripcion) === claveMusculo)
            .map((e) => normalizar(e.nombre))
        );

        for (const ejercicio of todosEjerciciosDB) {
          if (nombresManifest.has(normalizar(ejercicio.nombre))) {
            agregarCandidato(ejercicio, 0);
          }
        }
      }

      // 5.2 Recuperar filas antiguas cuyo músculo está guardado en descripcion.
      for (const ejercicio of todosEjerciciosDB) {
        if (normalizar(ejercicio.descripcion) === claveMusculo) {
          agregarCandidato(ejercicio, 1);
        }
      }

      // 5.3 Como respaldo, rescatar relaciones que aún existan para este músculo,
      // incluso si una versión antigua dejó descripcion incompleta.
      const relacionesActuales = await pool.query(
        `
        SELECT e.*
        FROM ejercicio_musculo em
        INNER JOIN ejercicios e ON e.id = em.ejercicio_id
        WHERE em.musculo_id = $1
          AND COALESCE(e.estado, 'ACTIVO') = 'ACTIVO'
        ORDER BY e.id ASC
        `,
        [musculoId]
      );

      for (const ejercicio of relacionesActuales.rows || []) {
        agregarCandidato(ejercicio, 2);
      }

      candidatos.sort((a, b) => {
        if (a.prioridad !== b.prioridad) return a.prioridad - b.prioridad;

        // Prioriza los ejercicios que ya tienen medio válido guardado.
        const mediaA = a.video_url || a.imagen_url ? 0 : 1;
        const mediaB = b.video_url || b.imagen_url ? 0 : 1;
        if (mediaA !== mediaB) return mediaA - mediaB;

        return Number(a.id) - Number(b.id);
      });

      const seleccionados = candidatos.slice(0, 30);

      // Reconstruimos SOLO las relaciones del músculo actual.
      // No se elimina ningún ejercicio ni ningún detalle de rutina.
      await pool.query(
        `DELETE FROM ejercicio_musculo WHERE musculo_id = $1`,
        [musculoId]
      );

      for (const ejercicio of seleccionados) {
        await pool.query(
          `
          INSERT INTO ejercicio_musculo (ejercicio_id, musculo_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
          `,
          [ejercicio.id, musculoId]
        );
      }

      resumenRecuperacion[musculo.nombre] = seleccionados.length;

      console.log(
        `${seleccionados.length === 30 ? "✅" : "⚠️"} ${musculo.nombre}: ${seleccionados.length}/30 ejercicios relacionados.`
      );
    }

    // =========================================================
    // 6. VERIFICACIÓN FINAL
    // =========================================================

    const conteoFinal = await pool.query(`
      SELECT
        m.nombre AS musculo,
        m.vista,
        COUNT(DISTINCT em.ejercicio_id)::int AS total
      FROM musculos m
      LEFT JOIN ejercicio_musculo em ON em.musculo_id = m.id
      GROUP BY m.id, m.nombre, m.vista
      ORDER BY m.vista, m.id
    `);

    console.log("======================================================");
    console.log("✅ RECUPERACIÓN GYM FINALIZADA");
    console.log("======================================================");
    console.table(conteoFinal.rows);

    const incompletos = conteoFinal.rows.filter(
      (fila) => Number(fila.total) < 30
    );

    if (incompletos.length) {
      console.warn(
        "⚠️ Hay músculos con menos de 30 filas físicas en PostgreSQL. No se inventaron ejercicios ni animaciones incorrectas:",
        incompletos.map((x) => `${x.musculo}: ${x.total}/30`).join(" | ")
      );
    } else {
      console.log("✅ Todos los músculos quedaron recuperados en 30/30.");
    }

    return {
      ok: true,
      resumen: resumenRecuperacion,
      conteo: conteoFinal.rows,
    };
  } catch (error) {
    console.error("❌ Error insertando/recuperando datos base:", error);
    throw error;
  }
}

module.exports = seedData;
