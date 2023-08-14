import type { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/HttpException";

import prisma from "@/utils/prisma";
import { PhoneServices } from "@/services";

type IUserBody = {
  name: string;
  phone_number: string;
};

// check
export class UsersController {
  constructor() {}

  public REGISTER = async (
    req: Request<{}, {}, IUserBody>,
    res: Response<{ status: boolean; message?: string; data?: object }>,
    next: NextFunction
  ) => {
    try {
      const { name, phone_number } = req.body;
      const phone = await prisma.user.findFirst({
        where: {
          phoneNumber: phone_number,
        },
      });
      if (phone)
        return new HttpException(400, "The phone number registered already");

      let newUser = await prisma.user.create({
        data: {
          phoneNumber: phone_number,
        },
      });
      const phoneService = new PhoneServices(phone_number);
      phoneService.sendSms(newUser);
    } catch (err) {
      next(err);
    }
  };
}
