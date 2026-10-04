import fs from 'node:fs/promises';
import { Turno, TurnoCrudo, normalizarTurno } from '../models/Turno.js';

/*
 * JUSTIFICACIÓN DE PROMESAS VS CALLBACKS (Consigna 5b):
 * El uso de callbacks tradicionales (fs.readFile(path, (err, data) => ...)) genera anidamiento 
 * excesivo ("Callback Hell") y dificulta la propagación de errores. El uso de `node:fs/promises` 
 * junto a async/await permite estructurar código asíncrono secuencial, legible y con manejo 
 * centralizado de excepciones mediante bloques try/catch.
 */

export const cargarYNormalizarTurnos = async (filePath: string): Promise<Turno[]> => {
  try {
    const rawData = await fs.readFile(filePath, 'utf-8');
    const parsedData: TurnoCrudo[] = JSON.parse(rawData);

    const turnosValidos: Turno[] = [];
    let aceptados = 0;
    let rechazados = 0;

    for (const item of parsedData) {
      const turnoLimpio = normalizarTurno(item);
      if (turnoLimpio) {
        turnosValidos.push(turnoLimpio);
        aceptados++;
      } else {
        rechazados++;
      }
    }

    console.log(`[Procesamiento JSON] Registros Aceptados: ${aceptados} | Registros Rechazados: ${rechazados}`);
    return turnosValidos;
  } catch (error) {
    console.error(`Error al procesar el archivo ${filePath}:`, error);
    return [];
  }
};