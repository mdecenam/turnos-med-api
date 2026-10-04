import { Medico } from '../models/Medico';

let medicosMemoria: Medico[] = [
  { id: 1, nombre: "Dra. Ana Torres", especialidad: "Pediatría", matricula: "MP-4512", disponible: true },
  { id: 2, nombre: "Dr. Roberto Gómez", especialidad: "Odontología", matricula: "MP-8821", disponible: false },
];

export const getMedicosService = (filters: { especialidad?: string; disponible?: string }): Medico[] => {
  let resultado = [...medicosMemoria];

  if (filters.especialidad) {
    resultado = resultado.filter(
      (m) => m.especialidad.toLowerCase() === filters.especialidad?.toLowerCase()
    );
  }

  if (filters.disponible !== undefined) {
    const isDisp = filters.disponible === 'true';
    resultado = resultado.filter((m) => m.disponible === isDisp);
  }

  return resultado;
};

export const getMedicoByIdService = (id: number): Medico | undefined => {
  return medicosMemoria.find((m) => m.id === id);
};

export const createMedicoService = (data: Omit<Medico, 'id'>): Medico => {
  const newId = medicosMemoria.length > 0 ? Math.max(...medicosMemoria.map((m) => m.id)) + 1 : 1;
  const nuevoMedico: Medico = { id: newId, ...data };
  medicosMemoria.push(nuevoMedico);
  return nuevoMedico;
};

export const updateMedicoService = (id: number, data: Partial<Medico>): Medico | null => {
  const index = medicosMemoria.findIndex((m) => m.id === id);
  if (index === -1) return null;

  medicosMemoria[index] = { ...medicosMemoria[index], ...data };
  return medicosMemoria[index];
};

export const deleteMedicoService = (id: number): boolean => {
  const index = medicosMemoria.findIndex((m) => m.id === id);
  if (index === -1) return false;

  medicosMemoria.splice(index, 1);
  return true;
};