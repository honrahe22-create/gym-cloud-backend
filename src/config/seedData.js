const pool = require("./db");

async function seedData() {
  try {
    // Músculos base
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
      { nombre: "Pantorrillas posterior", vista: "back" }
    ];

    for (const musculo of musculos) {
      await pool.query(
        `
        INSERT INTO musculos (nombre, vista)
        VALUES ($1, $2)
        ON CONFLICT (nombre) DO NOTHING
        `,
        [musculo.nombre, musculo.vista]
      );
    }

    // Ejercicios base
    const ejercicios = [
      {
        nombre: "Press inclinado",
        descripcion: "Ejercicio para pecho alto con banco inclinado.",
        imagen_url: "https://via.placeholder.com/300x200?text=Press+Inclinado",
        video_url: "",
        nivel: "Intermedio"
      },
      {
        nombre: "Press plano",
        descripcion: "Ejercicio para pecho medio.",
        imagen_url: "https://via.placeholder.com/300x200?text=Press+Plano",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Fondos para pecho",
        descripcion: "Ejercicio para pecho bajo.",
        imagen_url: "https://via.placeholder.com/300x200?text=Fondos+Pecho",
        video_url: "",
        nivel: "Intermedio"
      },
      {
        nombre: "Press militar",
        descripcion: "Ejercicio principal para hombros.",
        imagen_url: "https://via.placeholder.com/300x200?text=Press+Militar",
        video_url: "",
        nivel: "Intermedio"
      },
      {
        nombre: "Curl con barra",
        descripcion: "Ejercicio para bíceps.",
        imagen_url: "https://via.placeholder.com/300x200?text=Curl+Barra",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Crunch abdominal",
        descripcion: "Ejercicio básico para abdomen.",
        imagen_url: "https://via.placeholder.com/300x200?text=Crunch",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Sentadilla",
        descripcion: "Ejercicio principal para piernas.",
        imagen_url: "https://via.placeholder.com/300x200?text=Sentadilla",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Elevación de talones",
        descripcion: "Ejercicio para pantorrillas.",
        imagen_url: "https://via.placeholder.com/300x200?text=Pantorrillas",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Jalón al pecho",
        descripcion: "Ejercicio para espalda alta.",
        imagen_url: "https://via.placeholder.com/300x200?text=Jalon+al+Pecho",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Remo con barra",
        descripcion: "Ejercicio para espalda media.",
        imagen_url: "https://via.placeholder.com/300x200?text=Remo+Barra",
        video_url: "",
        nivel: "Intermedio"
      },
      {
        nombre: "Hiperextensiones",
        descripcion: "Ejercicio para espalda baja.",
        imagen_url: "https://via.placeholder.com/300x200?text=Hiperextensiones",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Extensión de tríceps",
        descripcion: "Ejercicio para tríceps.",
        imagen_url: "https://via.placeholder.com/300x200?text=Triceps",
        video_url: "",
        nivel: "Principiante"
      },
      {
        nombre: "Hip thrust",
        descripcion: "Ejercicio para glúteos.",
        imagen_url: "https://via.placeholder.com/300x200?text=Hip+Thrust",
        video_url: "",
        nivel: "Intermedio"
      },
      {
        nombre: "Curl femoral",
        descripcion: "Ejercicio para isquiotibiales.",
        imagen_url: "https://via.placeholder.com/300x200?text=Curl+Femoral",
        video_url: "",
        nivel: "Principiante"
      }
    ];

    for (const ejercicio of ejercicios) {
      await pool.query(
        `
        INSERT INTO ejercicios (nombre, descripcion, imagen_url, video_url, nivel)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING
        `,
        [
          ejercicio.nombre,
          ejercicio.descripcion,
          ejercicio.imagen_url,
          ejercicio.video_url,
          ejercicio.nivel
        ]
      );
    }

    // Relaciones ejercicio ↔ músculo
    const relaciones = [
      ["Press inclinado", "Pecho alto"],
      ["Press plano", "Pecho medio"],
      ["Fondos para pecho", "Pecho bajo"],
      ["Press militar", "Hombros"],
      ["Curl con barra", "Bíceps"],
      ["Crunch abdominal", "Abdomen"],
      ["Sentadilla", "Cuádriceps"],
      ["Elevación de talones", "Pantorrillas"],
      ["Jalón al pecho", "Espalda alta"],
      ["Remo con barra", "Espalda media"],
      ["Hiperextensiones", "Espalda baja"],
      ["Extensión de tríceps", "Tríceps"],
      ["Hip thrust", "Glúteos"],
      ["Curl femoral", "Isquiotibiales"],
      ["Elevación de talones", "Pantorrillas posterior"]
    ];

    for (const [ejercicioNombre, musculoNombre] of relaciones) {
      const ejercicioRes = await pool.query(
        `SELECT id FROM ejercicios WHERE nombre = $1 LIMIT 1`,
        [ejercicioNombre]
      );

      const musculoRes = await pool.query(
        `SELECT id FROM musculos WHERE nombre = $1 LIMIT 1`,
        [musculoNombre]
      );

      if (ejercicioRes.rows.length && musculoRes.rows.length) {
        const ejercicioId = ejercicioRes.rows[0].id;
        const musculoId = musculoRes.rows[0].id;

        const existe = await pool.query(
          `
          SELECT id
          FROM ejercicio_musculo
          WHERE ejercicio_id = $1 AND musculo_id = $2
          LIMIT 1
          `,
          [ejercicioId, musculoId]
        );

        if (!existe.rows.length) {
          await pool.query(
            `
            INSERT INTO ejercicio_musculo (ejercicio_id, musculo_id)
            VALUES ($1, $2)
            `,
            [ejercicioId, musculoId]
          );
        }
      }
    }

    console.log("✅ Datos base insertados correctamente");
  } catch (error) {
    console.error("❌ Error insertando datos base:", error);
  }
}

module.exports = seedData;