import type { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/HttpException";

import prisma from "@/utils/prisma";

type IUserBody = {
    name: string
    username: number
    phone: string
    password: string
}

export class UsersController {
  constructor() {}

  public CREATE_USER = async (
    req: Request<{}, {}, IUserBody>,
    res: Response<{ status: boolean; message?: string; data?: object }>,
    next: NextFunction
  ) => {
    res.status(200).json({
      status: true,
      message: "ok",
    });
  };
}
