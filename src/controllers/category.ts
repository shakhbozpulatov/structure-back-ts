import type { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/HttpException";

import prisma from "@/utils/prisma";

type ICategoryBody = {
    name: string
}

export class CategoryController {
    constructor() {}

    public CREATE_USER = async (
        req: Request<{}, {}, ICategoryBody>,
        res: Response<{ status: boolean; message?: string; data?: object }>,
        next: NextFunction
    ) => {
        res.status(200).json({
            status: true,
            message: "ok",
        });
    };
}
