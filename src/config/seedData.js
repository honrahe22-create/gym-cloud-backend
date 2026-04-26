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

{nombre:"Press inclinado",descripcion:"Pecho alto",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Aperturas inclinadas",descripcion:"Pecho alto",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Press hammer inclinado",descripcion:"Pecho alto",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Cruce poleas altas",descripcion:"Pecho alto",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Press inclinado mancuernas",descripcion:"Pecho alto",imagen_url:"",video_url:"",nivel:"Intermedio"},

{nombre:"Press plano",descripcion:"Pecho medio",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Aperturas planas",descripcion:"Pecho medio",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Chest press",descripcion:"Pecho medio",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Push ups",descripcion:"Pecho medio",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Press plano mancuernas",descripcion:"Pecho medio",imagen_url:"",video_url:"",nivel:"Intermedio"},

{nombre:"Fondos para pecho",descripcion:"Pecho bajo",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Press declinado",descripcion:"Pecho bajo",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Cruce polea baja",descripcion:"Pecho bajo",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Fondos asistidos",descripcion:"Pecho bajo",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Decline dumbbell press",descripcion:"Pecho bajo",imagen_url:"",video_url:"",nivel:"Intermedio"},

{nombre:"Press militar",descripcion:"Hombros",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Elevaciones laterales",descripcion:"Hombros",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Arnold press",descripcion:"Hombros",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Pajaros",descripcion:"Hombros",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Elevaciones frontales",descripcion:"Hombros",imagen_url:"",video_url:"",nivel:"Principiante"},

{nombre:"Curl con barra",descripcion:"Bíceps",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Curl martillo",descripcion:"Bíceps",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Curl alterno",descripcion:"Bíceps",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Curl polea",descripcion:"Bíceps",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Curl concentrado",descripcion:"Bíceps",imagen_url:"",video_url:"",nivel:"Intermedio"},

{nombre:"Crunch abdominal",descripcion:"Abdomen",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Plancha",descripcion:"Abdomen",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Russian twist",descripcion:"Abdomen",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Elevaciones piernas",descripcion:"Abdomen",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Mountain climbers",descripcion:"Abdomen",imagen_url:"",video_url:"",nivel:"Intermedio"},

{nombre:"Sentadilla",descripcion:"Cuádriceps",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Prensa",descripcion:"Cuádriceps",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Hack squat",descripcion:"Cuádriceps",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Zancadas",descripcion:"Cuádriceps",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Extension pierna",descripcion:"Cuádriceps",imagen_url:"",video_url:"",nivel:"Principiante"},

{nombre:"Jalon al pecho",descripcion:"Espalda alta",imagen_url:"",video_url:"",nivel:"Principiante"},
{nombre:"Dominadas",descripcion:"Espalda alta",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Face pull",descripcion:"Espalda alta",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Remo alto",descripcion:"Espalda alta",imagen_url:"",video_url:"",nivel:"Intermedio"},
{nombre:"Pullover polea",descripcion:"Espalda alta",imagen_url:"",video_url:"",nivel:"Intermedio"}

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
      ["Elevación de talones", "Pantorrillas posterior"],
      ["Aperturas inclinadas","Pecho alto"],
["Press hammer inclinado","Pecho alto"],
["Cruce poleas altas","Pecho alto"],
["Press inclinado mancuernas","Pecho alto"],

["Aperturas planas","Pecho medio"],
["Chest press","Pecho medio"],
["Push ups","Pecho medio"],
["Press plano mancuernas","Pecho medio"],

["Press declinado","Pecho bajo"],
["Cruce polea baja","Pecho bajo"],
["Fondos asistidos","Pecho bajo"],
["Decline dumbbell press","Pecho bajo"],

["Elevaciones laterales","Hombros"],
["Arnold press","Hombros"],
["Pajaros","Hombros"],
["Elevaciones frontales","Hombros"],

["Curl martillo","Bíceps"],
["Curl alterno","Bíceps"],
["Curl polea","Bíceps"],
["Curl concentrado","Bíceps"],

["Plancha","Abdomen"],
["Russian twist","Abdomen"],
["Elevaciones piernas","Abdomen"],
["Mountain climbers","Abdomen"],

["Prensa","Cuádriceps"],
["Hack squat","Cuádriceps"],
["Zancadas","Cuádriceps"],
["Extension pierna","Cuádriceps"],

["Dominadas","Espalda alta"],
["Face pull","Espalda alta"],
["Remo alto","Espalda alta"],
["Pullover polea","Espalda alta"]

["Aperturas planas", "Pecho medio"],
["Chest press", "Pecho medio"],
["Push ups", "Pecho medio"],
["Press plano mancuernas", "Pecho medio"],

["Extensión de tríceps","Tríceps"],
["Hip thrust","Glúteos"],
["Curl femoral","Isquiotibiales"],
["Elevaciones Talón","Pantorrillas"],
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