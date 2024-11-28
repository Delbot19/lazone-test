import { Request, Response } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

function errorMiddleware(error: ErrorWithStatus, req: Request, res: Response) {
  const status = error.status ?? 500;
  const message = error.message ?? "Something went wrong";

  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
