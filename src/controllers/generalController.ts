import { Request, Response, NextFunction } from 'express';

export const getHome = async (_req: Request, res: Response, _next: NextFunction) => {
  let status = 200;
  return res.status(status).json({
    status,
    message: "Bienvenido a la API RESTful de TurnosMed",
    version: "2.0.0"
  });
};

export const handleNotFound = async (req: Request, res: Response, _next: NextFunction) => {
  let status = 404;
  return res.status(status).json({
    status,
    error: "NOT_FOUND",
    message: `La ruta solicitada '${req.originalUrl}' no existe en el servidor.`
  });
};