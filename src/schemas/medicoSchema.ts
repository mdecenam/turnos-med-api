import { z } from 'zod';

const pascalCaseRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑa-záéíóúñ]+)*$/;

export const medicoSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  especialidad: z.string().refine((val) => pascalCaseRegex.test(val), {
    message: "La especialidad debe estar en formato PascalCase o Title Case (ej. 'Clínica médica', 'Pediatría')",
  }),
  matricula: z.string().min(3, "La matrícula es obligatoria"),
  disponible: z.boolean({ required_error: "El campo disponible es obligatorio" }),
});

export const updateMedicoSchema = medicoSchema.partial();