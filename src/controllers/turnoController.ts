import { Request, Response, NextFunction } from 'express';
import * as turnoService from '../services/turnoService';

export const getTurnos = (req: Request, res: Response) => {
  const filters = {
    especialidad: req.query.especialidad as string,
    fecha: req.query.fecha as string,
    medicoId: req.query.medicoId as string,
  };
  const turnos = turnoService.getTurnosService(filters);
  res.status(200).json(turnos);
};

export const getTurnoById = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const turno = turnoService.getTurnoByIdService(id);
  if (!turno) {
    return next({ status: 404, message: "Turno no encontrado", code: "NOT_FOUND" });
  }
  res.status(200).json(turno);
};

export const createTurno = (req: Request, res: Response) => {
  const nuevo = turnoService.createTurnoService(req.body);
  res.status(201).json(nuevo);
};

export const updateTurno = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const actualizado = turnoService.updateTurnoService(id, req.body);
  if (!actualizado) {
    return next({ status: 404, message: "Turno no encontrado para actualizar", code: "NOT_FOUND" });
  }
  res.status(200).json(actualizado);
};

export const deleteTurno = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const eliminado = turnoService.deleteTurnoService(id);
  if (!eliminado) {
    return next({ status: 404, message: "Turno no encontrado para eliminar", code: "NOT_FOUND" });
  }
  res.status(204).send();
};