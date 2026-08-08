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
        nombre: "Press inclinado",
        descripcion: "Pecho alto",
        video_url: "/videos/press-inclinado.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Aperturas inclinadas",
        descripcion: "Pecho alto",
        video_url: "/videos/aperturas-inclinadas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Press hammer inclinado",
        descripcion: "Pecho alto",
        video_url: "/videos/press-hammer-inclinado.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Cruce poleas altas",
        descripcion: "Pecho alto",
        video_url: "/videos/cruce-poleas-altas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Press inclinado mancuernas",
        descripcion: "Pecho alto",
        video_url: "/videos/press-inclinado-mancuernas.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // PECHO MEDIO
      // =======================================================

      {
        nombre: "Press plano",
        descripcion: "Pecho medio",
        video_url: "/videos/press-plano.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Aperturas planas",
        descripcion: "Pecho medio",
        video_url: "/videos/aperturas-planas.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Chest press",
        descripcion: "Pecho medio",
        video_url: "/videos/chest-press.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Lagartijas",
        descripcion: "Pecho medio",
        video_url: "/videos/lagartijas.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Press plano mancuernas",
        descripcion: "Pecho medio",
        video_url: "/videos/press-plano-mancuernas.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // PECHO BAJO
      // =======================================================

      {
        nombre: "Fondos para pecho",
        descripcion: "Pecho bajo",
        video_url: "/videos/fondos-pecho.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Press declinado",
        descripcion: "Pecho bajo",
        video_url: "/videos/press-declinado.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Cruce polea baja",
        descripcion: "Pecho bajo",
        video_url: "/videos/cruce-polea-baja.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Fondos asistidos",
        descripcion: "Pecho bajo",
        video_url: "/videos/fondos-asistidos.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Press declinado mancuernas",
        descripcion: "Pecho bajo",
        video_url: "/videos/press-declinado-mancuernas.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // HOMBROS
      // =======================================================

      {
        nombre: "Press militar",
        descripcion: "Hombros",
        video_url: "/videos/press-militar.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Elevaciones laterales",
        descripcion: "Hombros",
        video_url: "/videos/elevaciones-laterales.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Arnold press",
        descripcion: "Hombros",
        video_url: "/videos/arnold-press.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Pájaros",
        descripcion: "Hombros",
        video_url: "/videos/pajaros-hombros.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Elevaciones frontales",
        descripcion: "Hombros",
        video_url: "/videos/elevaciones-frontales.mp4",
        nivel: "Principiante",
      },

      // =======================================================
      // BÍCEPS
      // =======================================================

      {
        nombre: "Curl con barra",
        descripcion: "Bíceps",
        video_url: "/videos/curl-barra.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Curl martillo",
        descripcion: "Bíceps",
        video_url: "/videos/curl-martillo.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Curl alterno",
        descripcion: "Bíceps",
        video_url: "/videos/curl-alterno.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Curl en polea",
        descripcion: "Bíceps",
        video_url: "/videos/curl-polea.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Curl concentrado",
        descripcion: "Bíceps",
        video_url: "/videos/curl-concentrado.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // ABDOMEN
      // =======================================================

      {
        nombre: "Crunch abdominal",
        descripcion: "Abdomen",
        video_url: "/videos/crunch-abdominal.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Plancha",
        descripcion: "Abdomen",
        video_url: "/videos/plancha.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Giro ruso",
        descripcion: "Abdomen",
        video_url: "/videos/giro-ruso.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Elevaciones de piernas",
        descripcion: "Abdomen",
        video_url: "/videos/elevaciones-piernas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Escaladores de montaña",
        descripcion: "Abdomen",
        video_url: "/videos/escaladores-montana.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // CUÁDRICEPS
      // =======================================================

      {
        nombre: "Sentadilla",
        descripcion: "Cuádriceps",
        video_url: "/videos/sentadilla.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Prensa de piernas",
        descripcion: "Cuádriceps",
        video_url: "/videos/prensa-piernas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Hack squat",
        descripcion: "Cuádriceps",
        video_url: "/videos/hack-squat.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Zancadas",
        descripcion: "Cuádriceps",
        video_url: "/videos/zancadas.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Extensión de piernas",
        descripcion: "Cuádriceps",
        video_url: "/videos/extension-piernas.mp4",
        nivel: "Principiante",
      },

      // =======================================================
      // PANTORRILLAS FRONTAL
      // =======================================================

      {
        nombre: "Elevación de talones de pie",
        descripcion: "Pantorrillas",
        video_url: "/videos/elevacion-talones-pie.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Elevación de talón unilateral",
        descripcion: "Pantorrillas",
        video_url: "/videos/elevacion-talon-unilateral.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Elevación de talones en prensa",
        descripcion: "Pantorrillas",
        video_url: "/videos/pantorrillas-prensa.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Elevación de talones con mancuernas",
        descripcion: "Pantorrillas",
        video_url: "/videos/pantorrillas-mancuernas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Saltos de pantorrilla",
        descripcion: "Pantorrillas",
        video_url: "/videos/saltos-pantorrilla.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA ALTA
      // =======================================================

      {
        nombre: "Jalón al pecho",
        descripcion: "Espalda alta",
        video_url: "/videos/jalon-pecho.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Dominadas",
        descripcion: "Espalda alta",
        video_url: "/videos/dominadas.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Face pull",
        descripcion: "Espalda alta",
        video_url: "/videos/face-pull.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Remo alto",
        descripcion: "Espalda alta",
        video_url: "/videos/remo-alto.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Pullover en polea",
        descripcion: "Espalda alta",
        video_url: "/videos/pullover-polea.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA MEDIA
      // =======================================================

      {
        nombre: "Remo con barra",
        descripcion: "Espalda media",
        video_url: "/videos/remo-barra.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Remo sentado",
        descripcion: "Espalda media",
        video_url: "/videos/remo-sentado.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Remo con mancuerna",
        descripcion: "Espalda media",
        video_url: "/videos/remo-mancuerna.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Remo en máquina",
        descripcion: "Espalda media",
        video_url: "/videos/remo-maquina.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Remo T",
        descripcion: "Espalda media",
        video_url: "/videos/remo-t.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // ESPALDA BAJA
      // =======================================================

      {
        nombre: "Hiperextensiones",
        descripcion: "Espalda baja",
        video_url: "/videos/hiperextensiones.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Peso muerto",
        descripcion: "Espalda baja",
        video_url: "/videos/peso-muerto.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Buenos días",
        descripcion: "Espalda baja",
        video_url: "/videos/buenos-dias.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Superman",
        descripcion: "Espalda baja",
        video_url: "/videos/superman.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Peso muerto con trap bar",
        descripcion: "Espalda baja",
        video_url: "/videos/peso-muerto-trap-bar.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // TRÍCEPS
      // =======================================================

      {
        nombre: "Extensión de tríceps en polea",
        descripcion: "Tríceps",
        video_url: "/videos/extension-triceps-polea.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Press francés",
        descripcion: "Tríceps",
        video_url: "/videos/press-frances.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Fondos de tríceps",
        descripcion: "Tríceps",
        video_url: "/videos/fondos-triceps.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Extensión sobre cabeza",
        descripcion: "Tríceps",
        video_url: "/videos/extension-sobre-cabeza.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Patada de tríceps",
        descripcion: "Tríceps",
        video_url: "/videos/patada-triceps.mp4",
        nivel: "Principiante",
      },

      // =======================================================
      // GLÚTEOS
      // =======================================================

      {
        nombre: "Hip thrust",
        descripcion: "Glúteos",
        video_url: "/videos/hip-thrust.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Puente de glúteos",
        descripcion: "Glúteos",
        video_url: "/videos/puente-gluteos.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Patada de glúteo",
        descripcion: "Glúteos",
        video_url: "/videos/patada-gluteo.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Abducción de cadera",
        descripcion: "Glúteos",
        video_url: "/videos/abduccion-cadera.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Sentadilla sumo",
        descripcion: "Glúteos",
        video_url: "/videos/sentadilla-sumo.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // ISQUIOTIBIALES
      // =======================================================

      {
        nombre: "Curl femoral",
        descripcion: "Isquiotibiales",
        video_url: "/videos/curl-femoral.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Peso muerto rumano",
        descripcion: "Isquiotibiales",
        video_url: "/videos/peso-muerto-rumano.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Curl femoral sentado",
        descripcion: "Isquiotibiales",
        video_url: "/videos/curl-femoral-sentado.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Curl femoral unilateral",
        descripcion: "Isquiotibiales",
        video_url: "/videos/curl-femoral-unilateral.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Buenos días para femoral",
        descripcion: "Isquiotibiales",
        video_url: "/videos/buenos-dias-femoral.mp4",
        nivel: "Intermedio",
      },

      // =======================================================
      // PANTORRILLAS POSTERIOR
      // =======================================================

      {
        nombre: "Elevación de talones sentado",
        descripcion: "Pantorrillas posterior",
        video_url: "/videos/elevacion-talones-sentado.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Pantorrilla sentado unilateral",
        descripcion: "Pantorrillas posterior",
        video_url: "/videos/pantorrilla-sentado-unilateral.mp4",
        nivel: "Principiante",
      },
      {
        nombre: "Sóleo en máquina",
        descripcion: "Pantorrillas posterior",
        video_url: "/videos/soleo-maquina.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Pantorrilla sentado con barra",
        descripcion: "Pantorrillas posterior",
        video_url: "/videos/pantorrilla-sentado-barra.mp4",
        nivel: "Intermedio",
      },
      {
        nombre: "Pantorrilla sentado con mancuerna",
        descripcion: "Pantorrillas posterior",
        video_url: "/videos/pantorrilla-sentado-mancuerna.mp4",
        nivel: "Principiante",
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