import { NextFunction, Request, RequestHandler, Response } from "express";

export function wrapAsync(fn: (req: Request, res: Response, next: NextFunction) => void | Promise<void>): RequestHandler {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
