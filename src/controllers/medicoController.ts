import { Request, Response, NextFunction } from 'express';
import * as medicoService from '../services/medicoService';

export const getMedicos = (req: Request, res: Response) => {
  const filters = {
    especialidad: req.query.especialidad as string,
    disponible: req.query.disponible as string,
  };
  const medicos = medicoService.getMedicosService(filters);
  res.status(200).json(medicos);
};

export const getMedicoById = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const medico = medicoService.getMedicoByIdService(id);
  if (!medico) {
    return next({ status: 404, message: "Médico no encontrado", code: "NOT_FOUND" });
  }
  res.status(200).json(medico);
};

export const createMedico = (req: Request, res: Response) => {
  const nuevo = medicoService.createMedicoService(req.body);
  res.status(201).json(nuevo);
};

export const updateMedico = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const actualizado = medicoService.updateMedicoService(id, req.body);
  if (!actualizado) {
    return next({ status: 404, message: "Médico no encontrado para actualizar", code: "NOT_FOUND" });
  }
  res.status(200).json(actualizado);
};

export const deleteMedico = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const eliminado = medicoService.deleteMedicoService(id);
  if (!eliminado) {
    return next({ status: 404, message: "Médico no encontrado para eliminar", code: "NOT_FOUND" });
  }
  res.status(204).send();
};