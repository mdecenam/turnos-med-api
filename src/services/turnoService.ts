import { Turno } from '../models/Turno';

let turnosMemoria: Turno[] = [
  { id: 102, paciente: "Carlos Ruiz", documento: "31654210", especialidad: "Pediatría", fecha: "14/08/2026", hora: "10.00", confirmado: true, medicoId: 1 }
];

export const getTurnosService = (filters: { especialidad?: string; fecha?: string; medicoId?: string }): Turno[] => {
  let resultado = [...turnosMemoria];

  if (filters.especialidad) {
    resultado = resultado.filter((t) => t.especialidad.toLowerCase() === filters.especialidad?.toLowerCase());
  }

  if (filters.fecha) {
    resultado = resultado.filter((t) => t.fecha === filters.fecha);
  }

  if (filters.medicoId) {
    const medId = parseInt(filters.medicoId, 10);
    resultado = resultado.filter((t) => t.medicoId === medId);
  }

  return resultado;
};

export const getTurnoByIdService = (id: number): Turno | undefined => {
  return turnosMemoria.find((t) => t.id === id);
};

export const createTurnoService = (data: Omit<Turno, 'id'>): Turno => {
  const newId = turnosMemoria.length > 0 ? Math.max(...turnosMemoria.map((t) => t.id)) + 1 : 101;
  const nuevoTurno: Turno = { id: newId, ...data };
  turnosMemoria.push(nuevoTurno);
  return nuevoTurno;
};

export const updateTurnoService = (id: number, data: Partial<Turno>): Turno | null => {
  const index = turnosMemoria.findIndex((t) => t.id === id);
  if (index === -1) return null;

  turnosMemoria[index] = { ...turnosMemoria[index], ...data };
  return turnosMemoria[index];
};

export const deleteTurnoService = (id: number): boolean => {
  const index = turnosMemoria.findIndex((t) => t.id === id);
  if (index === -1) return false;

  turnosMemoria.splice(index, 1);
  return true;
};