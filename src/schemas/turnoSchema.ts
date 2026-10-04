import { z } from 'zod';

const pascalCaseRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/;

export const turnoSchema = z.object({
  paciente: z.string().min(2, "El nombre del paciente es obligatorio"),
  documento: z.string().min(6, "El documento debe ser una cadena de al menos 6 caracteres"),
  especialidad: z.string().refine((val) => pascalCaseRegex.test(val), {
    message: "La especialidad debe estar en formato PascalCase o Title Case (ej. 'Pediatría')",
  }),
  fecha: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "La fecha debe tener el formato DD/MM/AAAA"),
  hora: z.string().regex(/^\d{2}\.\d{2}$/, "La hora debe tener el formato HH.MM"),
  confirmado: z.boolean().default(false),
  medicoId: z.number().positive().optional(),
  observaciones: z.string().optional(),
});

export const updateTurnoSchema = turnoSchema.partial();