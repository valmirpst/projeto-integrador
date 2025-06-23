import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { UnauthorizedError } from "../exceptions/errors";

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError();
  }

  const token = authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError("Token do usuário não fornecido");

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError("Token inválido ou expirado");
  }
}
