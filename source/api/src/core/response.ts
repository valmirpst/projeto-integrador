import { Response } from "express";

interface SuccessResponse {
  res: Response;
  payload: any;
  status?: number;
  message?: string;
}

interface ErrorResponse {
  res: Response;
  error: any;
  status?: number;
  message?: string;
}

const ok = ({ res, payload, status = 200, message = "Request successful" }: SuccessResponse): Response => {
  return res.status(status).json({
    success: true,
    message,
    data: payload,
  });
};

const error = ({ res, error, status = 500, message = "Internal server error" }: ErrorResponse): Response => {
  console.error(error);
  return res.status(status).json({
    success: false,
    message,
    error: error instanceof Error ? error.message : error,
  });
};

export const response = {
  ok,
  error,
};
