import { RequestHandler } from "express";
import { wrapAsync } from "./wrap-async";

export function wrapController<T extends RequestHandler, C>(fn: T, context: C): RequestHandler {
  return wrapAsync(fn.bind(context));
}
