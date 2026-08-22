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
    ["Flexiones inclinadas", "Empuje", "Principiante", "Flexiones inclinadas: ejercicio de calistenia nivel principiante enfocado en empuje, control corporal y técnica progresiva."],
    ["Sentadilla al aire", "Piernas", "Principiante", "Sentadilla al aire: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Plancha frontal", "Core", "Principiante", "Plancha frontal: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Remo australiano", "Tirón", "Principiante", "Remo australiano: ejercicio de calistenia nivel principiante enfocado en tirón, control corporal y técnica progresiva."],
    ["Puente de glúteos", "Piernas", "Principiante", "Puente de glúteos: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Flexiones clásicas", "Empuje", "Principiante", "Flexiones clásicas: ejercicio de calistenia nivel principiante enfocado en empuje, control corporal y técnica progresiva."],
    ["Dominada asistida", "Tirón", "Principiante", "Dominada asistida: ejercicio de calistenia nivel principiante enfocado en tirón, control corporal y técnica progresiva."],
    ["Fondos asistidos", "Empuje", "Principiante", "Fondos asistidos: ejercicio de calistenia nivel principiante enfocado en empuje, control corporal y técnica progresiva."],
    ["Zancadas alternas", "Piernas", "Principiante", "Zancadas alternas: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Dead bug", "Core", "Principiante", "Dead bug: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Bird dog", "Core", "Principiante", "Bird dog: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Plancha alta", "Core", "Principiante", "Plancha alta: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Plancha con rodillas apoyadas", "Core", "Principiante", "Plancha con rodillas apoyadas: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Sentadilla isométrica en pared", "Piernas", "Principiante", "Sentadilla isométrica en pared: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Step-up bajo", "Piernas", "Principiante", "Step-up bajo: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Elevación de pantorrillas", "Piernas", "Principiante", "Elevación de pantorrillas: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Flexión de rodillas apoyadas", "Empuje", "Principiante", "Flexión de rodillas apoyadas: ejercicio de calistenia nivel principiante enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexión escapular", "Empuje", "Principiante", "Flexión escapular: ejercicio de calistenia nivel principiante enfocado en empuje, control corporal y técnica progresiva."],
    ["Remo invertido con rodillas flexionadas", "Tirón", "Principiante", "Remo invertido con rodillas flexionadas: ejercicio de calistenia nivel principiante enfocado en tirón, control corporal y técnica progresiva."],
    ["Colgado pasivo", "Agarre", "Principiante", "Colgado pasivo: ejercicio de calistenia nivel principiante enfocado en agarre, control corporal y técnica progresiva."],
    ["Colgado activo", "Agarre", "Principiante", "Colgado activo: ejercicio de calistenia nivel principiante enfocado en agarre, control corporal y técnica progresiva."],
    ["Superman", "Core", "Principiante", "Superman: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Mountain climber lento", "Core", "Principiante", "Mountain climber lento: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Crunch invertido", "Core", "Principiante", "Crunch invertido: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Elevación de rodillas de pie", "Core", "Principiante", "Elevación de rodillas de pie: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Buenos días sin peso", "Piernas", "Principiante", "Buenos días sin peso: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Desplante atrás asistido", "Piernas", "Principiante", "Desplante atrás asistido: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Sentadilla sumo", "Piernas", "Principiante", "Sentadilla sumo: ejercicio de calistenia nivel principiante enfocado en piernas, control corporal y técnica progresiva."],
    ["Bear crawl básico", "Locomoción", "Principiante", "Bear crawl básico: ejercicio de calistenia nivel principiante enfocado en locomoción, control corporal y técnica progresiva."],
    ["Hollow hold básico", "Core", "Principiante", "Hollow hold básico: ejercicio de calistenia nivel principiante enfocado en core, control corporal y técnica progresiva."],
    ["Fondos en paralelas", "Empuje", "Intermedio", "Fondos en paralelas: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Dominadas estrictas", "Tirón", "Intermedio", "Dominadas estrictas: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["V-Up", "Core", "Intermedio", "V-Up: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Flexiones cerradas", "Empuje", "Intermedio", "Flexiones cerradas: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Elevación vertical de piernas", "Core", "Intermedio", "Elevación vertical de piernas: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Plancha lateral", "Core", "Intermedio", "Plancha lateral: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Dominada commando", "Tirón", "Intermedio", "Dominada commando: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Fondos escapulares", "Empuje", "Intermedio", "Fondos escapulares: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Dominada supina", "Tirón", "Intermedio", "Dominada supina: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada ancho de hombros", "Tirón", "Intermedio", "Dominada ancho de hombros: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Flexiones diamante", "Empuje", "Intermedio", "Flexiones diamante: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexiones declinadas", "Empuje", "Intermedio", "Flexiones declinadas: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexiones archer asistidas", "Empuje", "Intermedio", "Flexiones archer asistidas: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Pike push-up", "Empuje", "Intermedio", "Pike push-up: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Sentadilla búlgara", "Piernas", "Intermedio", "Sentadilla búlgara: ejercicio de calistenia nivel intermedio enfocado en piernas, control corporal y técnica progresiva."],
    ["Pistol squat asistida", "Piernas", "Intermedio", "Pistol squat asistida: ejercicio de calistenia nivel intermedio enfocado en piernas, control corporal y técnica progresiva."],
    ["Zancada lateral", "Piernas", "Intermedio", "Zancada lateral: ejercicio de calistenia nivel intermedio enfocado en piernas, control corporal y técnica progresiva."],
    ["Salto al cajón", "Potencia", "Intermedio", "Salto al cajón: ejercicio de calistenia nivel intermedio enfocado en potencia, control corporal y técnica progresiva."],
    ["Burpee controlado", "Metabólico", "Intermedio", "Burpee controlado: ejercicio de calistenia nivel intermedio enfocado en metabólico, control corporal y técnica progresiva."],
    ["Hollow rocks", "Core", "Intermedio", "Hollow rocks: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Toes to bar asistido", "Core", "Intermedio", "Toes to bar asistido: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Knee raises colgado", "Core", "Intermedio", "Knee raises colgado: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["Remo australiano pies elevados", "Tirón", "Intermedio", "Remo australiano pies elevados: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada negativa", "Tirón", "Intermedio", "Dominada negativa: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada agarre neutro", "Tirón", "Intermedio", "Dominada agarre neutro: ejercicio de calistenia nivel intermedio enfocado en tirón, control corporal y técnica progresiva."],
    ["Fondos en banco", "Empuje", "Intermedio", "Fondos en banco: ejercicio de calistenia nivel intermedio enfocado en empuje, control corporal y técnica progresiva."],
    ["Plancha con toque de hombros", "Core", "Intermedio", "Plancha con toque de hombros: ejercicio de calistenia nivel intermedio enfocado en core, control corporal y técnica progresiva."],
    ["L-sit tuck", "Habilidad", "Intermedio", "L-sit tuck: ejercicio de calistenia nivel intermedio enfocado en habilidad, control corporal y técnica progresiva."],
    ["Handstand asistido", "Habilidad", "Intermedio", "Handstand asistido: ejercicio de calistenia nivel intermedio enfocado en habilidad, control corporal y técnica progresiva."],
    ["Bear crawl lateral", "Locomoción", "Intermedio", "Bear crawl lateral: ejercicio de calistenia nivel intermedio enfocado en locomoción, control corporal y técnica progresiva."],
    ["Muscle-up estricto", "Habilidad", "Avanzado", "Muscle-up estricto: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Muscle-up explosivo", "Habilidad", "Avanzado", "Muscle-up explosivo: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Handstand push-up", "Empuje", "Avanzado", "Handstand push-up: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Handstand libre", "Habilidad", "Avanzado", "Handstand libre: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Front lever tuck", "Habilidad", "Avanzado", "Front lever tuck: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Front lever avanzado", "Habilidad", "Avanzado", "Front lever avanzado: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Back lever tuck", "Habilidad", "Avanzado", "Back lever tuck: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Back lever avanzado", "Habilidad", "Avanzado", "Back lever avanzado: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Planche lean", "Habilidad", "Avanzado", "Planche lean: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Tuck planche", "Habilidad", "Avanzado", "Tuck planche: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Pseudo planche push-up", "Empuje", "Avanzado", "Pseudo planche push-up: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexiones archer", "Empuje", "Avanzado", "Flexiones archer: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexiones a una mano asistidas", "Empuje", "Avanzado", "Flexiones a una mano asistidas: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Flexiones a una mano", "Empuje", "Avanzado", "Flexiones a una mano: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Dominada explosiva al pecho", "Tirón", "Avanzado", "Dominada explosiva al pecho: ejercicio de calistenia nivel avanzado enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada archer", "Tirón", "Avanzado", "Dominada archer: ejercicio de calistenia nivel avanzado enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada typewriter", "Tirón", "Avanzado", "Dominada typewriter: ejercicio de calistenia nivel avanzado enfocado en tirón, control corporal y técnica progresiva."],
    ["Dominada L-sit", "Tirón", "Avanzado", "Dominada L-sit: ejercicio de calistenia nivel avanzado enfocado en tirón, control corporal y técnica progresiva."],
    ["Fondos coreanos", "Empuje", "Avanzado", "Fondos coreanos: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Fondos profundos", "Empuje", "Avanzado", "Fondos profundos: ejercicio de calistenia nivel avanzado enfocado en empuje, control corporal y técnica progresiva."],
    ["Pistol squat", "Piernas", "Avanzado", "Pistol squat: ejercicio de calistenia nivel avanzado enfocado en piernas, control corporal y técnica progresiva."],
    ["Shrimp squat", "Piernas", "Avanzado", "Shrimp squat: ejercicio de calistenia nivel avanzado enfocado en piernas, control corporal y técnica progresiva."],
    ["Nordic curl asistido", "Piernas", "Avanzado", "Nordic curl asistido: ejercicio de calistenia nivel avanzado enfocado en piernas, control corporal y técnica progresiva."],
    ["Nordic curl", "Piernas", "Avanzado", "Nordic curl: ejercicio de calistenia nivel avanzado enfocado en piernas, control corporal y técnica progresiva."],
    ["Dragon flag", "Core", "Avanzado", "Dragon flag: ejercicio de calistenia nivel avanzado enfocado en core, control corporal y técnica progresiva."],
    ["Toes to bar estricto", "Core", "Avanzado", "Toes to bar estricto: ejercicio de calistenia nivel avanzado enfocado en core, control corporal y técnica progresiva."],
    ["L-sit completo", "Habilidad", "Avanzado", "L-sit completo: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["V-sit progresión", "Habilidad", "Avanzado", "V-sit progresión: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Human flag tuck", "Habilidad", "Avanzado", "Human flag tuck: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
    ["Human flag progresión", "Habilidad", "Avanzado", "Human flag progresión: ejercicio de calistenia nivel avanzado enfocado en habilidad, control corporal y técnica progresiva."],
  ],
  Boxeo: [
    ["Guardia y movilidad", "Técnica", "Principiante", "Guardia y movilidad: ejercicio de boxeo nivel principiante enfocado en técnica, técnica, coordinación y control."],
    ["Jab directo", "Golpes", "Principiante", "Jab directo: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Defensa en guardia", "Defensa", "Principiante", "Defensa en guardia: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Sombra básica", "Sombra", "Principiante", "Sombra básica: ejercicio de boxeo nivel principiante enfocado en sombra, técnica, coordinación y control."],
    ["Trabajo en saco básico", "Saco", "Principiante", "Trabajo en saco básico: ejercicio de boxeo nivel principiante enfocado en saco, técnica, coordinación y control."],
    ["Cross directo", "Golpes", "Principiante", "Cross directo: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Jab-cross", "Combinaciones", "Principiante", "Jab-cross: ejercicio de boxeo nivel principiante enfocado en combinaciones, técnica, coordinación y control."],
    ["Gancho de izquierda", "Golpes", "Principiante", "Gancho de izquierda: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Gancho de derecha", "Golpes", "Principiante", "Gancho de derecha: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Uppercut de izquierda", "Golpes", "Principiante", "Uppercut de izquierda: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Uppercut de derecha", "Golpes", "Principiante", "Uppercut de derecha: ejercicio de boxeo nivel principiante enfocado en golpes, técnica, coordinación y control."],
    ["Paso adelante y atrás", "Movilidad", "Principiante", "Paso adelante y atrás: ejercicio de boxeo nivel principiante enfocado en movilidad, técnica, coordinación y control."],
    ["Desplazamiento lateral", "Movilidad", "Principiante", "Desplazamiento lateral: ejercicio de boxeo nivel principiante enfocado en movilidad, técnica, coordinación y control."],
    ["Pivot básico", "Movilidad", "Principiante", "Pivot básico: ejercicio de boxeo nivel principiante enfocado en movilidad, técnica, coordinación y control."],
    ["Slip izquierda-derecha", "Defensa", "Principiante", "Slip izquierda-derecha: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Bloqueo de jab", "Defensa", "Principiante", "Bloqueo de jab: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Bloqueo de cross", "Defensa", "Principiante", "Bloqueo de cross: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Parry de jab", "Defensa", "Principiante", "Parry de jab: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Roll bajo gancho", "Defensa", "Principiante", "Roll bajo gancho: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Entrada con jab", "Técnica", "Principiante", "Entrada con jab: ejercicio de boxeo nivel principiante enfocado en técnica, técnica, coordinación y control."],
    ["Salida con paso lateral", "Técnica", "Principiante", "Salida con paso lateral: ejercicio de boxeo nivel principiante enfocado en técnica, técnica, coordinación y control."],
    ["Sombra 1-2", "Sombra", "Principiante", "Sombra 1-2: ejercicio de boxeo nivel principiante enfocado en sombra, técnica, coordinación y control."],
    ["Sombra con desplazamiento", "Sombra", "Principiante", "Sombra con desplazamiento: ejercicio de boxeo nivel principiante enfocado en sombra, técnica, coordinación y control."],
    ["Saco jab-cross", "Saco", "Principiante", "Saco jab-cross: ejercicio de boxeo nivel principiante enfocado en saco, técnica, coordinación y control."],
    ["Saco golpes al cuerpo", "Saco", "Principiante", "Saco golpes al cuerpo: ejercicio de boxeo nivel principiante enfocado en saco, técnica, coordinación y control."],
    ["Manoplas básicas 1-2", "Manoplas", "Principiante", "Manoplas básicas 1-2: ejercicio de boxeo nivel principiante enfocado en manoplas, técnica, coordinación y control."],
    ["Coordinación mano-ojo", "Coordinación", "Principiante", "Coordinación mano-ojo: ejercicio de boxeo nivel principiante enfocado en coordinación, técnica, coordinación y control."],
    ["Salto de cuerda básico", "Acondicionamiento", "Principiante", "Salto de cuerda básico: ejercicio de boxeo nivel principiante enfocado en acondicionamiento, técnica, coordinación y control."],
    ["Guardia alta en movimiento", "Defensa", "Principiante", "Guardia alta en movimiento: ejercicio de boxeo nivel principiante enfocado en defensa, técnica, coordinación y control."],
    ["Respiración y ritmo", "Técnica", "Principiante", "Respiración y ritmo: ejercicio de boxeo nivel principiante enfocado en técnica, técnica, coordinación y control."],
    ["Golpes de potencia", "Golpes", "Intermedio", "Golpes de potencia: ejercicio de boxeo nivel intermedio enfocado en golpes, técnica, coordinación y control."],
    ["Saco con combinaciones", "Saco", "Intermedio", "Saco con combinaciones: ejercicio de boxeo nivel intermedio enfocado en saco, técnica, coordinación y control."],
    ["Combinaciones con pareja", "Combinaciones", "Intermedio", "Combinaciones con pareja: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Manoplas - combinación", "Manoplas", "Intermedio", "Manoplas - combinación: ejercicio de boxeo nivel intermedio enfocado en manoplas, técnica, coordinación y control."],
    ["Manoplas - velocidad", "Manoplas", "Intermedio", "Manoplas - velocidad: ejercicio de boxeo nivel intermedio enfocado en manoplas, técnica, coordinación y control."],
    ["Doble jab-cross", "Combinaciones", "Intermedio", "Doble jab-cross: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Jab-cross-gancho", "Combinaciones", "Intermedio", "Jab-cross-gancho: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Jab al cuerpo-cross arriba", "Combinaciones", "Intermedio", "Jab al cuerpo-cross arriba: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Cross-gancho-cross", "Combinaciones", "Intermedio", "Cross-gancho-cross: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Uppercut-gancho-cross", "Combinaciones", "Intermedio", "Uppercut-gancho-cross: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Slip y contra cross", "Contraataque", "Intermedio", "Slip y contra cross: ejercicio de boxeo nivel intermedio enfocado en contraataque, técnica, coordinación y control."],
    ["Parry y contra jab", "Contraataque", "Intermedio", "Parry y contra jab: ejercicio de boxeo nivel intermedio enfocado en contraataque, técnica, coordinación y control."],
    ["Roll y gancho al cuerpo", "Contraataque", "Intermedio", "Roll y gancho al cuerpo: ejercicio de boxeo nivel intermedio enfocado en contraataque, técnica, coordinación y control."],
    ["Pivot con contraataque", "Contraataque", "Intermedio", "Pivot con contraataque: ejercicio de boxeo nivel intermedio enfocado en contraataque, técnica, coordinación y control."],
    ["Cambio de ángulo 45 grados", "Movilidad", "Intermedio", "Cambio de ángulo 45 grados: ejercicio de boxeo nivel intermedio enfocado en movilidad, técnica, coordinación y control."],
    ["Entrada-salida con combinación", "Técnica", "Intermedio", "Entrada-salida con combinación: ejercicio de boxeo nivel intermedio enfocado en técnica, técnica, coordinación y control."],
    ["Sombra con defensa activa", "Sombra", "Intermedio", "Sombra con defensa activa: ejercicio de boxeo nivel intermedio enfocado en sombra, técnica, coordinación y control."],
    ["Sombra por rounds", "Sombra", "Intermedio", "Sombra por rounds: ejercicio de boxeo nivel intermedio enfocado en sombra, técnica, coordinación y control."],
    ["Saco intervalos 30-30", "Saco", "Intermedio", "Saco intervalos 30-30: ejercicio de boxeo nivel intermedio enfocado en saco, técnica, coordinación y control."],
    ["Saco potencia al cuerpo", "Saco", "Intermedio", "Saco potencia al cuerpo: ejercicio de boxeo nivel intermedio enfocado en saco, técnica, coordinación y control."],
    ["Saco precisión por zonas", "Saco", "Intermedio", "Saco precisión por zonas: ejercicio de boxeo nivel intermedio enfocado en saco, técnica, coordinación y control."],
    ["Manoplas reacción", "Manoplas", "Intermedio", "Manoplas reacción: ejercicio de boxeo nivel intermedio enfocado en manoplas, técnica, coordinación y control."],
    ["Manoplas defensa-contra", "Manoplas", "Intermedio", "Manoplas defensa-contra: ejercicio de boxeo nivel intermedio enfocado en manoplas, técnica, coordinación y control."],
    ["Trabajo de cuerda intermedio", "Acondicionamiento", "Intermedio", "Trabajo de cuerda intermedio: ejercicio de boxeo nivel intermedio enfocado en acondicionamiento, técnica, coordinación y control."],
    ["Footwork en escalera", "Movilidad", "Intermedio", "Footwork en escalera: ejercicio de boxeo nivel intermedio enfocado en movilidad, técnica, coordinación y control."],
    ["Esquivas con cuerda", "Defensa", "Intermedio", "Esquivas con cuerda: ejercicio de boxeo nivel intermedio enfocado en defensa, técnica, coordinación y control."],
    ["Combinación 1-2-3-2", "Combinaciones", "Intermedio", "Combinación 1-2-3-2: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Combinación 1-1-2-3", "Combinaciones", "Intermedio", "Combinación 1-1-2-3: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Combinación cuerpo-cabeza", "Combinaciones", "Intermedio", "Combinación cuerpo-cabeza: ejercicio de boxeo nivel intermedio enfocado en combinaciones, técnica, coordinación y control."],
    ["Sparring técnico condicionado", "Sparring", "Intermedio", "Sparring técnico condicionado: ejercicio de boxeo nivel intermedio enfocado en sparring, técnica, coordinación y control."],
    ["Sparring defensa y contraataque", "Sparring", "Avanzado", "Sparring defensa y contraataque: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Sparring técnico", "Sparring", "Avanzado", "Sparring técnico: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Boxeo de potencia avanzado", "Potencia", "Avanzado", "Boxeo de potencia avanzado: ejercicio de boxeo nivel avanzado enfocado en potencia, técnica, coordinación y control."],
    ["Manoplas de alta intensidad", "Manoplas", "Avanzado", "Manoplas de alta intensidad: ejercicio de boxeo nivel avanzado enfocado en manoplas, técnica, coordinación y control."],
    ["Combinación avanzada", "Combinaciones", "Avanzado", "Combinación avanzada: ejercicio de boxeo nivel avanzado enfocado en combinaciones, técnica, coordinación y control."],
    ["Sparring libre controlado", "Sparring", "Avanzado", "Sparring libre controlado: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Sparring por objetivos", "Sparring", "Avanzado", "Sparring por objetivos: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Sparring solo contraataque", "Sparring", "Avanzado", "Sparring solo contraataque: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Sparring presión y salida", "Sparring", "Avanzado", "Sparring presión y salida: ejercicio de boxeo nivel avanzado enfocado en sparring, técnica, coordinación y control."],
    ["Cambio de guardia en combinación", "Técnica", "Avanzado", "Cambio de guardia en combinación: ejercicio de boxeo nivel avanzado enfocado en técnica, técnica, coordinación y control."],
    ["Contraataque en segundo tiempo", "Contraataque", "Avanzado", "Contraataque en segundo tiempo: ejercicio de boxeo nivel avanzado enfocado en contraataque, técnica, coordinación y control."],
    ["Doble contraataque", "Contraataque", "Avanzado", "Doble contraataque: ejercicio de boxeo nivel avanzado enfocado en contraataque, técnica, coordinación y control."],
    ["Check hook y salida", "Contraataque", "Avanzado", "Check hook y salida: ejercicio de boxeo nivel avanzado enfocado en contraataque, técnica, coordinación y control."],
    ["Pull counter", "Contraataque", "Avanzado", "Pull counter: ejercicio de boxeo nivel avanzado enfocado en contraataque, técnica, coordinación y control."],
    ["Slip-cross-gancho-cross", "Combinaciones", "Avanzado", "Slip-cross-gancho-cross: ejercicio de boxeo nivel avanzado enfocado en combinaciones, técnica, coordinación y control."],
    ["Roll-gancho-uppercut-cross", "Combinaciones", "Avanzado", "Roll-gancho-uppercut-cross: ejercicio de boxeo nivel avanzado enfocado en combinaciones, técnica, coordinación y control."],
    ["Combinación de 6 golpes", "Combinaciones", "Avanzado", "Combinación de 6 golpes: ejercicio de boxeo nivel avanzado enfocado en combinaciones, técnica, coordinación y control."],
    ["Combinación de 8 golpes", "Combinaciones", "Avanzado", "Combinación de 8 golpes: ejercicio de boxeo nivel avanzado enfocado en combinaciones, técnica, coordinación y control."],
    ["Ángulos después de combinación", "Movilidad", "Avanzado", "Ángulos después de combinación: ejercicio de boxeo nivel avanzado enfocado en movilidad, técnica, coordinación y control."],
    ["Pivot ofensivo avanzado", "Movilidad", "Avanzado", "Pivot ofensivo avanzado: ejercicio de boxeo nivel avanzado enfocado en movilidad, técnica, coordinación y control."],
    ["Footwork pendular avanzado", "Movilidad", "Avanzado", "Footwork pendular avanzado: ejercicio de boxeo nivel avanzado enfocado en movilidad, técnica, coordinación y control."],
    ["Saco rounds de potencia", "Saco", "Avanzado", "Saco rounds de potencia: ejercicio de boxeo nivel avanzado enfocado en saco, técnica, coordinación y control."],
    ["Saco rounds de velocidad", "Saco", "Avanzado", "Saco rounds de velocidad: ejercicio de boxeo nivel avanzado enfocado en saco, técnica, coordinación y control."],
    ["Saco reacción por señal", "Saco", "Avanzado", "Saco reacción por señal: ejercicio de boxeo nivel avanzado enfocado en saco, técnica, coordinación y control."],
    ["Manoplas abiertas avanzadas", "Manoplas", "Avanzado", "Manoplas abiertas avanzadas: ejercicio de boxeo nivel avanzado enfocado en manoplas, técnica, coordinación y control."],
    ["Manoplas con desplazamiento", "Manoplas", "Avanzado", "Manoplas con desplazamiento: ejercicio de boxeo nivel avanzado enfocado en manoplas, técnica, coordinación y control."],
    ["Defensa de múltiples golpes", "Defensa", "Avanzado", "Defensa de múltiples golpes: ejercicio de boxeo nivel avanzado enfocado en defensa, técnica, coordinación y control."],
    ["Corte de ring", "Táctica", "Avanzado", "Corte de ring: ejercicio de boxeo nivel avanzado enfocado en táctica, técnica, coordinación y control."],
    ["Control de distancia avanzado", "Táctica", "Avanzado", "Control de distancia avanzado: ejercicio de boxeo nivel avanzado enfocado en táctica, técnica, coordinación y control."],
    ["Ritmo y cambios de tempo", "Táctica", "Avanzado", "Ritmo y cambios de tempo: ejercicio de boxeo nivel avanzado enfocado en táctica, técnica, coordinación y control."],
  ],
};


// =========================================================
// MEDIOS EXACTOS YA EXISTENTES - CALISTENIA / BOXEO
// No se asigna un video de otro ejercicio para rellenar.
// =========================================================
const DISCIPLINE_EXACT_MEDIA = {
  Calistenia: {
    // 19 medios originales ya existentes.
    "Flexiones inclinadas": "/videos/calistenia/flexiones-inclinadas.mp4",
    "Sentadilla al aire": "/videos/calistenia/sentadilla-aire.mp4",
    "Plancha frontal": "/videos/calistenia/plancha-frontal.mp4",
    "Remo australiano": "/videos/calistenia/remo-australiano.mp4",
    "Puente de glúteos": "/videos/calistenia/puente-gluteos.mp4",
    "Flexiones clásicas": "/videos/calistenia/flexiones-clasicas.mp4",
    "Dominada asistida": "/videos/calistenia/dominada-asistida.mp4",
    "Fondos asistidos": "/videos/calistenia/fondos-asistidos.mp4",
    "Zancadas alternas": "/videos/calistenia/zancadas-alternas.mp4",
    "V-Up": "/videos/calistenia/v-up.mp4",
    "Dominadas estrictas": "/videos/calistenia/dominadas-estrictas.mp4",
    "Fondos en paralelas": "/videos/calistenia/fondos-paralelas.mp4",
    "Flexiones cerradas": "/videos/calistenia/flexiones-cerradas.mp4",
    "Elevación vertical de piernas": "/videos/calistenia/elevacion-vertical-piernas.mp4",
    "Plancha lateral": "/videos/calistenia/plancha-lateral.mp4",
    "Dominada commando": "/videos/calistenia/dominada-commando.mp4",
    "Dominada supina": "/videos/calistenia/dominada-supina.mp4",
    "Fondos escapulares": "/videos/calistenia/fondos-escapulares.mp4",
    "Dominada ancho de hombros": "/videos/calistenia/dominada-ancho-hombros.mp4",

    // GIFs ExerciseDB descargados y que SÍ coinciden con el catálogo vigente.
    "Elevación de pantorrillas": "/videos/calistenia/elevacion-pantorrillas.gif",
    "Remo invertido con rodillas flexionadas": "/videos/calistenia/remo-invertido-sillas.gif",
    "Crunch invertido": "/videos/calistenia/crunch-invertido.gif",
    "Flexiones diamante": "/videos/calistenia/flexiones-diamante-cerradas.gif",
    "Burpee controlado": "/videos/calistenia/burpee.gif",
    "Knee raises colgado": "/videos/calistenia/elevacion-rodillas-colgado.gif",
    "Fondos en banco": "/videos/calistenia/fondos-en-banco.gif",
  },
  Boxeo: {
    // SOLO videos reales/originales del módulo.
    // Los MP4 pequeños tipo dibujo/esquema NO se consideran videos reales.
    "Guardia y movilidad": "/videos/boxeo/guardia-y-movilidad.mp4",
    "Jab directo": "/videos/boxeo/jab-directo.mp4",
    "Defensa en guardia": "/videos/boxeo/defensa-guardia.mp4",
    "Sombra básica": "/videos/boxeo/sombra-basica.mp4",
    "Trabajo en saco básico": "/videos/boxeo/trabajo-en-saco.mp4",

    "Golpes de potencia": "/videos/boxeo/golpes-potencia.mp4",
    "Saco con combinaciones": "/videos/boxeo/saco-combinaciones.mp4",
    "Combinaciones con pareja": "/videos/boxeo/combinaciones-con-pareja.mp4",
    "Manoplas - combinación": "/videos/boxeo/manoplas-combinacion.mp4",
    "Manoplas - velocidad": "/videos/boxeo/manoplas-velocidad.mp4",

    "Sparring defensa y contraataque": "/videos/boxeo/sparring-defensa-contraataque.mp4",
    "Sparring técnico": "/videos/boxeo/sparring-tecnico.mp4",
    "Boxeo de potencia avanzado": "/videos/boxeo/boxeo-potencia-avanzado.mp4",
    "Manoplas de alta intensidad": "/videos/boxeo/manoplas-intensidad.mp4",
    "Combinación avanzada": "/videos/boxeo/combinacion-avanzada.mp4",
  },
};

function validarCatalogoDisciplinasEnCodigo() {
  for (const disciplina of ["Calistenia", "Boxeo"]) {
    for (const nivel of ["Principiante", "Intermedio", "Avanzado"]) {
      const total = (DISCIPLINE_SEED[disciplina] || []).filter(
        (item) => item[2] === nivel
      ).length;

      if (total !== 30) {
        throw new Error(
          `${disciplina} ${nivel}: catálogo fuente ${total}/30. Se esperaban 30.`
        );
      }
    }
  }
}


function slugDisciplinaMedia(valor = "") {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imagenAnimadaDisciplina(disciplinaNombre, nombreEjercicio) {
  const carpeta =
    disciplinaNombre === "Calistenia" ? "calistenia" : "boxeo";

  return `/discipline-media/${carpeta}/${slugDisciplinaMedia(nombreEjercicio)}.svg`;
}

async function ensureDisciplineModule() {
  validarCatalogoDisciplinasEnCodigo();

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

  // =========================================================
  // RECUPERACIÓN AUTOMÁTICA: CALISTENIA Y BOXEO
  // Garantiza que las disciplinas padre existan ANTES de sembrar
  // los 30 ejercicios de cada nivel. La versión anterior hacía
  // `continue` si faltaba la disciplina y dejaba el catálogo vacío.
  // =========================================================
  for (const disciplinaNombre of Object.keys(DISCIPLINE_SEED)) {
    const disciplinaExistente = await pool.query(
      `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [disciplinaNombre]
    );

    if (!disciplinaExistente.rows.length) {
      await pool.query(
        `INSERT INTO disciplinas (nombre, estado) VALUES ($1, 'ACTIVO')`,
        [disciplinaNombre]
      );
      console.log(`♻️ Disciplina recuperada: ${disciplinaNombre}`);
    } else {
      await pool.query(
        `UPDATE disciplinas SET estado = 'ACTIVO' WHERE id = $1`,
        [disciplinaExistente.rows[0].id]
      );
    }
  }

  for (const [disciplinaNombre, ejercicios] of Object.entries(DISCIPLINE_SEED)) {
    const disciplinaRes = await pool.query(
      `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [disciplinaNombre]
    );

    if (!disciplinaRes.rows.length) continue;
    const disciplinaId = disciplinaRes.rows[0].id;

    for (const [nombre, categoria, nivel, descripcion] of ejercicios) {
      const videoExacto =
        DISCIPLINE_EXACT_MEDIA[disciplinaNombre]?.[nombre] || "";

      // Cada ejercicio sin video real recibe SU PROPIO medio animado.
      // No se reutiliza el video de otro ejercicio.
      const imagenExacta = videoExacto
        ? ""
        : imagenAnimadaDisciplina(disciplinaNombre, nombre);

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
          (disciplina_id, nombre, descripcion, nivel, categoria, video_url, imagen_url, estado)
          VALUES ($1,$2,$3,$4,$5,$6,$7,'ACTIVO')
          `,
          [
            disciplinaId,
            nombre,
            descripcion,
            nivel,
            categoria,
            videoExacto,
            imagenExacta,
          ]
        );
      } else {
        await pool.query(
          `
          UPDATE disciplina_ejercicios
          SET descripcion = $1,
              nivel = $2,
              categoria = $3,
              video_url = $4,
              imagen_url = $5,
              estado = 'ACTIVO'
          WHERE id = $6
          `,
          [
            descripcion,
            nivel,
            categoria,
            videoExacto,
            imagenExacta,
            existe.rows[0].id,
          ]
        );
      }
    }
  }


  // Catálogo 2026: no se realizan renombres heredados.
  // Los nombres, niveles y categorías se controlan directamente desde DISCIPLINE_SEED.

  // =========================================================
  // CALISTENIA: CATÁLOGO AUTORITATIVO SIN DUPLICADOS
  // =========================================================
  const calisteniaCatalogoRes = await pool.query(
    `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER('Calistenia') LIMIT 1`
  );

  if (calisteniaCatalogoRes.rows.length) {
    const calisteniaId = calisteniaCatalogoRes.rows[0].id;

    const nombresCalisteniaActuales = DISCIPLINE_SEED.Calistenia.map(
      ([nombre]) => nombre
    );

    await pool.query(
      `
      UPDATE disciplina_ejercicios
      SET estado = CASE
        WHEN nombre = ANY($2::text[]) THEN 'ACTIVO'
        ELSE 'INACTIVO'
      END
      WHERE disciplina_id = $1
      `,
      [calisteniaId, nombresCalisteniaActuales]
    );

    await pool.query(
      `
      UPDATE disciplina_ejercicios de
      SET estado = 'INACTIVO'
      WHERE de.disciplina_id = $1
        AND de.id NOT IN (
          SELECT MIN(id)
          FROM disciplina_ejercicios
          WHERE disciplina_id = $1
            AND nombre = ANY($2::text[])
          GROUP BY LOWER(nombre)
        )
      `,
      [calisteniaId, nombresCalisteniaActuales]
    );
  }

  const boxeoRes = await pool.query(
    `SELECT id FROM disciplinas WHERE LOWER(nombre) = LOWER('Boxeo') LIMIT 1`
  );

  if (boxeoRes.rows.length) {
    const boxeoId = boxeoRes.rows[0].id;

    const nombresBoxeoActuales = DISCIPLINE_SEED.Boxeo.map(
      ([nombre]) => nombre
    );

    await pool.query(
      `
      UPDATE disciplina_ejercicios
      SET estado = CASE
        WHEN nombre = ANY($2::text[]) THEN 'ACTIVO'
        ELSE 'INACTIVO'
      END
      WHERE disciplina_id = $1
      `,
      [boxeoId, nombresBoxeoActuales]
    );

    await pool.query(
      `
      UPDATE disciplina_ejercicios de
      SET estado = 'INACTIVO'
      WHERE de.disciplina_id = $1
        AND de.id NOT IN (
          SELECT MIN(id)
          FROM disciplina_ejercicios
          WHERE disciplina_id = $1
            AND nombre = ANY($2::text[])
          GROUP BY LOWER(nombre)
        )
      `,
      [boxeoId, nombresBoxeoActuales]
    );
  }

  const conteoCatalogo = await pool.query(`
    SELECT
      d.nombre AS disciplina,
      de.nivel,
      COUNT(*)::int AS total
    FROM disciplina_ejercicios de
    INNER JOIN disciplinas d ON d.id = de.disciplina_id
    WHERE d.nombre IN ('Calistenia', 'Boxeo')
      AND de.estado = 'ACTIVO'
    GROUP BY d.nombre, de.nivel
    ORDER BY d.nombre, de.nivel
  `);

  console.log("✅ Módulos Calistenia y Boxeo preparados", conteoCatalogo.rows);
}

// =========================================================
// RECUPERACIÓN AUTOMÁTICA: GYM 30 POR MÚSCULO
// No borra ejercicios ni rutinas. Solo recompone relaciones
// ejercicio <-> músculo a partir del campo descripcion.
// =========================================================
async function ensureGymExerciseRelations() {
  const musculosGym = [
    ["Pecho alto", "front"],
    ["Pecho medio", "front"],
    ["Pecho bajo", "front"],
    ["Hombros", "front"],
    ["Bíceps", "front"],
    ["Abdomen", "front"],
    ["Cuádriceps", "front"],
    ["Pantorrillas", "front"],
    ["Trapecio", "back"],
    ["Espalda alta", "back"],
    ["Espalda media", "back"],
    ["Espalda baja", "back"],
    ["Tríceps", "back"],
    ["Glúteos", "back"],
    ["Isquiotibiales", "back"],
    ["Pantorrillas posterior", "back"],
  ];

  for (const [nombre, vista] of musculosGym) {
    const existe = await pool.query(
      `SELECT id FROM musculos WHERE LOWER(nombre) = LOWER($1) LIMIT 1`,
      [nombre]
    );

    if (!existe.rows.length) {
      await pool.query(
        `INSERT INTO musculos (nombre, vista) VALUES ($1, $2)`,
        [nombre, vista]
      );
      console.log(`♻️ Músculo recuperado: ${nombre}`);
    } else {
      await pool.query(
        `UPDATE musculos SET vista = $1 WHERE id = $2`,
        [vista, existe.rows[0].id]
      );
    }
  }

  const relaciones = await pool.query(`
    INSERT INTO ejercicio_musculo (ejercicio_id, musculo_id)
    SELECT e.id, m.id
    FROM ejercicios e
    INNER JOIN musculos m
      ON LOWER(TRIM(m.nombre)) = LOWER(TRIM(e.descripcion))
    WHERE COALESCE(e.estado, 'ACTIVO') = 'ACTIVO'
      AND NOT EXISTS (
        SELECT 1
        FROM ejercicio_musculo em
        WHERE em.ejercicio_id = e.id
          AND em.musculo_id = m.id
      )
    RETURNING ejercicio_id, musculo_id
  `);

  const conteoGym = await pool.query(`
    SELECT m.nombre AS musculo, COUNT(DISTINCT e.id)::int AS total
    FROM musculos m
    LEFT JOIN ejercicio_musculo em ON em.musculo_id = m.id
    LEFT JOIN ejercicios e
      ON e.id = em.ejercicio_id
      AND COALESCE(e.estado, 'ACTIVO') = 'ACTIVO'
    WHERE m.nombre = ANY($1::text[])
    GROUP BY m.id, m.nombre
    ORDER BY m.id ASC
  `, [musculosGym.map(([nombre]) => nombre)]);

  console.log(`✅ Relaciones GYM recuperadas: ${relaciones.rowCount || 0} nuevas`);
  console.log("✅ Conteo GYM por músculo:", conteoGym.rows);
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


app.get("/api/disciplinas/:nombre/estado-medios", async (req, res) => {
  try {
    const { nombre } = req.params;

    const result = await pool.query(
      `
      SELECT
        de.nivel,
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE COALESCE(NULLIF(TRIM(de.video_url), ''), '') <> ''
        )::int AS con_video,
        COUNT(*) FILTER (
          WHERE COALESCE(NULLIF(TRIM(de.video_url), ''), '') = ''
            AND COALESCE(NULLIF(TRIM(de.imagen_url), ''), '') <> ''
        )::int AS con_respaldo,
        COUNT(*) FILTER (
          WHERE COALESCE(NULLIF(TRIM(de.video_url), ''), '') = ''
            AND COALESCE(NULLIF(TRIM(de.imagen_url), ''), '') = ''
        )::int AS sin_medio
      FROM disciplina_ejercicios de
      INNER JOIN disciplinas d ON d.id = de.disciplina_id
      WHERE LOWER(d.nombre) = LOWER($1)
        AND de.estado = 'ACTIVO'
      GROUP BY de.nivel
      ORDER BY
        CASE de.nivel
          WHEN 'Principiante' THEN 1
          WHEN 'Intermedio' THEN 2
          WHEN 'Avanzado' THEN 3
          ELSE 4
        END
      `,
      [nombre]
    );

    res.json({ ok: true, disciplina: nombre, niveles: result.rows || [] });
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

// ============================================================
// MEMBRESÍAS / MENSUALIDADES / REPORTES
// ============================================================

async function ensureMembershipModule() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS membresias (
      id SERIAL PRIMARY KEY,
      socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
      plan_nombre VARCHAR(100) NOT NULL DEFAULT 'Mensual',
      fecha_inicio DATE NOT NULL,
      fecha_fin DATE NOT NULL,
      monto NUMERIC(10,2) NOT NULL DEFAULT 0,
      estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVA',
      observacion TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS pagos_membresia (
      id SERIAL PRIMARY KEY,
      membresia_id INTEGER NOT NULL REFERENCES membresias(id) ON DELETE CASCADE,
      socio_id INTEGER NOT NULL REFERENCES socios(id) ON DELETE CASCADE,
      monto NUMERIC(10,2) NOT NULL DEFAULT 0,
      metodo_pago VARCHAR(40) NOT NULL DEFAULT 'EFECTIVO',
      referencia VARCHAR(180),
      observacion TEXT,
      estado VARCHAR(30) NOT NULL DEFAULT 'PAGADO',
      fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_membresias_socio
    ON membresias (socio_id)
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_membresias_fecha_fin
    ON membresias (fecha_fin)
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_pagos_membresia_fecha
    ON pagos_membresia (fecha_pago)
  `);

  console.log("✅ Módulo Membresías/Mensualidades verificado.");
}

function addMonthsSafe(fechaISO, meses) {
  const fecha = new Date(`${fechaISO}T12:00:00`);
  if (Number.isNaN(fecha.getTime())) return null;

  const diaOriginal = fecha.getDate();
  fecha.setDate(1);
  fecha.setMonth(fecha.getMonth() + Number(meses || 1));

  const ultimoDia = new Date(
    fecha.getFullYear(),
    fecha.getMonth() + 1,
    0
  ).getDate();

  fecha.setDate(Math.min(diaOriginal, ultimoDia));
  return fecha.toISOString().slice(0, 10);
}

function membershipStatusSql(alias = "m") {
  return `
    CASE
      WHEN ${alias}.estado = 'ANULADA' THEN 'ANULADA'
      WHEN ${alias}.fecha_fin < CURRENT_DATE THEN 'VENCIDA'
      WHEN ${alias}.fecha_fin <= CURRENT_DATE + INTERVAL '7 days' THEN 'POR VENCER'
      ELSE 'ACTIVA'
    END
  `;
}

app.get("/api/membresias", async (req, res) => {
  try {
    const { desde, hasta, estado, socio_id } = req.query;
    const params = [];
    const where = [];

    if (desde) {
      params.push(desde);
      where.push(`m.fecha_inicio >= $${params.length}`);
    }

    if (hasta) {
      params.push(hasta);
      where.push(`m.fecha_inicio <= $${params.length}`);
    }

    if (socio_id) {
      params.push(Number(socio_id));
      where.push(`m.socio_id = $${params.length}`);
    }

    const estadoCalculado = membershipStatusSql("m");

    if (estado && estado !== "TODOS") {
      params.push(String(estado).toUpperCase());
      where.push(`(${estadoCalculado}) = $${params.length}`);
    }

    const result = await pool.query(
      `
      SELECT
        m.*,
        CONCAT(s.nombres, ' ', s.apellidos) AS socio_nombre,
        s.cedula,
        ${estadoCalculado} AS estado_calculado,
        COALESCE(SUM(CASE WHEN p.estado = 'PAGADO' THEN p.monto ELSE 0 END),0) AS total_pagado,
        GREATEST(
          m.monto - COALESCE(SUM(CASE WHEN p.estado = 'PAGADO' THEN p.monto ELSE 0 END),0),
          0
        ) AS saldo_pendiente
      FROM membresias m
      INNER JOIN socios s ON s.id = m.socio_id
      LEFT JOIN pagos_membresia p ON p.membresia_id = m.id
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
      GROUP BY m.id, s.id
      ORDER BY m.fecha_inicio DESC, m.id DESC
      `,
      params
    );

    res.json({ ok: true, membresias: result.rows });
  } catch (error) {
    console.error("Error listando membresías:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/api/membresias", async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      socio_id,
      plan_nombre,
      fecha_inicio,
      meses,
      monto,
      monto_pagado,
      metodo_pago,
      referencia,
      observacion,
    } = req.body || {};

    const socioId = Number(socio_id);
    const mesesNumero = Math.max(1, Number(meses || 1));
    const montoNumero = Number(monto || 0);
    const pagoInicial = Number(monto_pagado || 0);

    if (!socioId || !fecha_inicio || montoNumero < 0) {
      return res.status(400).json({
        ok: false,
        error: "Socio, fecha de inicio y monto son obligatorios.",
      });
    }

    const fechaFin = addMonthsSafe(fecha_inicio, mesesNumero);
    if (!fechaFin) {
      return res.status(400).json({ ok: false, error: "Fecha de inicio inválida." });
    }

    await client.query("BEGIN");

    const socio = await client.query(
      `SELECT id FROM socios WHERE id = $1 LIMIT 1`,
      [socioId]
    );

    if (!socio.rowCount) {
      await client.query("ROLLBACK");
      return res.status(404).json({ ok: false, error: "Socio no encontrado." });
    }

    const creada = await client.query(
      `
      INSERT INTO membresias (
        socio_id,
        plan_nombre,
        fecha_inicio,
        fecha_fin,
        monto,
        estado,
        observacion,
        updated_at
      )
      VALUES ($1,$2,$3,$4,$5,'ACTIVA',$6,CURRENT_TIMESTAMP)
      RETURNING *
      `,
      [
        socioId,
        String(plan_nombre || "Mensual"),
        fecha_inicio,
        fechaFin,
        montoNumero,
        observacion || null,
      ]
    );

    const membresia = creada.rows[0];

    if (pagoInicial > 0) {
      await client.query(
        `
        INSERT INTO pagos_membresia (
          membresia_id,
          socio_id,
          monto,
          metodo_pago,
          referencia,
          observacion,
          estado
        )
        VALUES ($1,$2,$3,$4,$5,$6,'PAGADO')
        `,
        [
          membresia.id,
          socioId,
          pagoInicial,
          String(metodo_pago || "EFECTIVO").toUpperCase(),
          referencia || null,
          "Pago inicial de membresía",
        ]
      );
    }

    await client.query("COMMIT");
    res.status(201).json({ ok: true, membresia });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creando membresía:", error);
    res.status(500).json({ ok: false, error: error.message });
  } finally {
    client.release();
  }
});

app.post("/api/membresias/:id/pagos", async (req, res) => {
  try {
    const membresiaId = Number(req.params.id);
    const {
      monto,
      metodo_pago = "EFECTIVO",
      referencia = null,
      observacion = null,
    } = req.body || {};

    const montoNumero = Number(monto || 0);

    if (!membresiaId || montoNumero <= 0) {
      return res.status(400).json({
        ok: false,
        error: "Membresía y monto válido son obligatorios.",
      });
    }

    const membresia = await pool.query(
      `SELECT * FROM membresias WHERE id = $1 LIMIT 1`,
      [membresiaId]
    );

    if (!membresia.rowCount) {
      return res.status(404).json({ ok: false, error: "Membresía no encontrada." });
    }

    if (membresia.rows[0].estado === "ANULADA") {
      return res.status(400).json({
        ok: false,
        error: "No se puede registrar pagos en una membresía anulada.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO pagos_membresia (
        membresia_id,
        socio_id,
        monto,
        metodo_pago,
        referencia,
        observacion,
        estado
      )
      VALUES ($1,$2,$3,$4,$5,$6,'PAGADO')
      RETURNING *
      `,
      [
        membresiaId,
        membresia.rows[0].socio_id,
        montoNumero,
        String(metodo_pago).toUpperCase(),
        referencia || null,
        observacion || null,
      ]
    );

    res.status(201).json({ ok: true, pago: result.rows[0] });
  } catch (error) {
    console.error("Error registrando pago:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.patch("/api/membresias/:id/estado", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const estado = String(req.body?.estado || "").toUpperCase();

    if (!["ACTIVA", "ANULADA"].includes(estado)) {
      return res.status(400).json({ ok: false, error: "Estado inválido." });
    }

    const result = await pool.query(
      `
      UPDATE membresias
      SET estado = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [estado, id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ ok: false, error: "Membresía no encontrada." });
    }

    res.json({ ok: true, membresia: result.rows[0] });
  } catch (error) {
    console.error("Error actualizando membresía:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/membresias/resumen", async (_req, res) => {
  try {
    const estadoCalculado = membershipStatusSql("m");

    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE (${estadoCalculado}) = 'ACTIVA') AS activas,
        COUNT(*) FILTER (WHERE (${estadoCalculado}) = 'POR VENCER') AS por_vencer,
        COUNT(*) FILTER (WHERE (${estadoCalculado}) = 'VENCIDA') AS vencidas,
        COUNT(DISTINCT m.socio_id) FILTER (
          WHERE (${estadoCalculado}) IN ('ACTIVA','POR VENCER')
        ) AS socios_con_membresia,
        COALESCE((
          SELECT SUM(p.monto)
          FROM pagos_membresia p
          WHERE p.estado = 'PAGADO'
            AND p.fecha_pago >= date_trunc('month', CURRENT_DATE)
            AND p.fecha_pago < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month'
        ),0) AS ingresos_mes
      FROM membresias m
    `);

    res.json({ ok: true, resumen: result.rows[0] || {} });
  } catch (error) {
    console.error("Error resumen membresías:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get("/api/reportes/pagos-membresia", async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    const params = [];
    const where = ["p.estado = 'PAGADO'"];

    if (desde) {
      params.push(desde);
      where.push(`p.fecha_pago >= $${params.length}::date`);
    }

    if (hasta) {
      params.push(hasta);
      where.push(`p.fecha_pago < ($${params.length}::date + INTERVAL '1 day')`);
    }

    const result = await pool.query(
      `
      SELECT
        p.*,
        m.plan_nombre,
        CONCAT(s.nombres, ' ', s.apellidos) AS socio_nombre,
        s.cedula
      FROM pagos_membresia p
      INNER JOIN membresias m ON m.id = p.membresia_id
      INNER JOIN socios s ON s.id = p.socio_id
      WHERE ${where.join(" AND ")}
      ORDER BY p.fecha_pago DESC, p.id DESC
      `,
      params
    );

    res.json({ ok: true, pagos: result.rows });
  } catch (error) {
    console.error("Error reporte pagos membresía:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
});


// ==============================
// DIAGNÓSTICO DE CATÁLOGOS
// ==============================
app.get("/api/catalogos/estado", async (_req, res) => {
  try {
    const gym = await pool.query(`
      SELECT
        m.nombre AS musculo,
        COUNT(DISTINCT e.id)::int AS total,
        COUNT(DISTINCT e.id) FILTER (
          WHERE COALESCE(NULLIF(TRIM(e.video_url), ''), NULLIF(TRIM(e.imagen_url), '')) IS NOT NULL
        )::int AS con_medio,
        COUNT(DISTINCT e.id) FILTER (
          WHERE COALESCE(NULLIF(TRIM(e.video_url), ''), NULLIF(TRIM(e.imagen_url), '')) IS NULL
        )::int AS sin_medio
      FROM musculos m
      LEFT JOIN ejercicio_musculo em ON em.musculo_id = m.id
      LEFT JOIN ejercicios e
        ON e.id = em.ejercicio_id
        AND COALESCE(e.estado, 'ACTIVO') = 'ACTIVO'
      GROUP BY m.id, m.nombre
      ORDER BY m.id ASC
    `);

    const disciplinas = await pool.query(`
      SELECT
        d.nombre AS disciplina,
        de.nivel,
        COUNT(*)::int AS total,
        COUNT(*) FILTER (
          WHERE COALESCE(NULLIF(TRIM(de.video_url), ''), NULLIF(TRIM(de.imagen_url), '')) IS NOT NULL
        )::int AS con_medio,
        COUNT(*) FILTER (
          WHERE COALESCE(NULLIF(TRIM(de.video_url), ''), NULLIF(TRIM(de.imagen_url), '')) IS NULL
        )::int AS sin_medio
      FROM disciplinas d
      LEFT JOIN disciplina_ejercicios de
        ON de.disciplina_id = d.id
        AND de.estado = 'ACTIVO'
      WHERE LOWER(d.nombre) IN ('calistenia', 'boxeo')
      GROUP BY d.id, d.nombre, de.nivel
      ORDER BY d.nombre, de.nivel
    `);

    res.json({
      ok: true,
      gym: gym.rows,
      disciplinas: disciplinas.rows,
    });
  } catch (error) {
    console.error("Error diagnóstico catálogos:", error);
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

    // GYM 30: seedData() ya deja las relaciones vigentes.
    await seedData();
    // No ejecutar ensureGymExerciseRelations(): remezcla ejercicios legacy.

    // Luego garantizamos los catálogos completos de Calistenia y Boxeo.
    await ensureDisciplineModule();
    await ensureMembershipModule();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando servidor:", error);
  }
}

startServer();