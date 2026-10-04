import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface AppError extends Error {
  status?: number;
  code?: string;
  details?: any[];
}

export const errorHandler = (
  err: AppError | ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    const details = (err.issues || []).map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    return res.status(400).json({
      status: 400,
      message: "Error de validación en los datos ingresados",
      code: "VALIDATION_ERROR",
      details,
    });
  }

  const status = (err as AppError).status || 500;
  const message = err.message || "Error interno del servidor";
  const code = (err as AppError).code || "INTERNAL_SERVER_ERROR";
  const details = (err as AppError).details || [];

  return res.status(status).json({
    status,
    message,
    code,
    details,
  });
};