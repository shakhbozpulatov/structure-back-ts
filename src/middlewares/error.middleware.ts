import { NextFunction, Request, Response } from "express";
import { HttpException } from "@exceptions/HttpException";
import { Prisma } from "@prisma/client";
import { logger } from "@utils/logger";

type ErrorMiddlewareTypes = {
  status: number;
  message: string;
  hasJSON: boolean;
};

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _error: ErrorMiddlewareTypes = {
      status: error.status || 500,
      message: error.message || "Something went wrong",
      hasJSON: error.hasJSON || false,
    };

    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(500).json({
        status: false,
        error: true,
        type: "validation_error",
        message: error.message,
      });
    }

    logger.error(
      `[${req.method}] ${req.path} >> Status code: ${_error.status}, Message: ${_error.message}`
    );

    if (_error.hasJSON) {
      res.status(_error.status).json(JSON.parse(_error.message));
      return;
    }

    res.status(_error.status).json({
      status: false,
      error: true,
      message: _error.message,
    });
  } catch (error) {
    next(error);
  }
};
