const pool = require("./db");

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
    // 3. INSERTAR / ACTUALIZAR EJERCICIOS SIN DUPLICAR
    // =========================================================

    for (const ejercicio of ejercicios) {
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

      let ejercicioId;

      if (existente.rows.length > 0) {
        ejercicioId = existente.rows[0].id;

        await pool.query(
          `
          UPDATE ejercicios
          SET descripcion = $1,
              imagen_url = $2,
              video_url = $3,
              nivel = $4,
              estado = 'ACTIVO'
          WHERE id = $5
          `,
          [
            ejercicio.descripcion,
            "",
            ejercicio.video_url,
            ejercicio.nivel,
            ejercicioId,
          ]
        );
      } else {
        const nuevo = await pool.query(
          `
          INSERT INTO ejercicios
            (nombre, descripcion, imagen_url, video_url, nivel, estado)
          VALUES
            ($1, $2, $3, $4, $5, 'ACTIVO')
          RETURNING id
          `,
          [
            ejercicio.nombre,
            ejercicio.descripcion,
            "",
            ejercicio.video_url,
            ejercicio.nivel,
          ]
        );

        ejercicioId = nuevo.rows[0].id;
      }

      // =======================================================
      // 4. RELACIONAR AUTOMÁTICAMENTE CON EL MÚSCULO
      // =======================================================

      const musculoRes = await pool.query(
        `
        SELECT id
        FROM musculos
        WHERE nombre = $1
        LIMIT 1
        `,
        [ejercicio.descripcion]
      );

      if (!musculoRes.rows.length) {
        console.warn(
          `⚠️ No se encontró músculo para ${ejercicio.nombre}: ${ejercicio.descripcion}`
        );
        continue;
      }

      const musculoId = musculoRes.rows[0].id;

      const relacionExistente = await pool.query(
        `
        SELECT id
        FROM ejercicio_musculo
        WHERE ejercicio_id = $1
          AND musculo_id = $2
        LIMIT 1
        `,
        [ejercicioId, musculoId]
      );

      if (!relacionExistente.rows.length) {
        await pool.query(
          `
          INSERT INTO ejercicio_musculo
            (ejercicio_id, musculo_id)
          VALUES
            ($1, $2)
          `,
          [ejercicioId, musculoId]
        );
      }
    }

    console.log("✅ Datos base del GYM insertados/actualizados correctamente.");
    console.log(`✅ ${ejercicios.length} ejercicios configurados.`);
  } catch (error) {
    console.error("❌ Error insertando datos base:", error);
  }
}

module.exports = seedData;