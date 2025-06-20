import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { BadRequestError, ConflictError, NotFoundError } from "../exceptions/errors";

export function handleErrorMiddleware(error: unknown, req: Request, res: Response, next: NextFunction) {
  let errors: string[] = [];
  let status = 500;

  if (error instanceof ZodError) {
    status = 400;
    errors = error.errors.map(e => e.message);
  } else if (error instanceof NotFoundError) {
    status = 404;
    errors = [error.message];
  } else if (error instanceof ConflictError) {
    status = 409;
    errors = [error.message];
  } else if (error instanceof BadRequestError) {
    status = 400;
    errors = [error.message];
  } else if (error instanceof Error) {
    errors = [error.message || "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."];
  } else {
    console.error(error);
  }

  res.status(status).json({ success: false, errors });
}
