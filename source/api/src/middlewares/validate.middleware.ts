import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateMiddleware = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: result.error.errors.map(err => err.message) });
    return;
  }

  req.body = result.data;
  next();
};
