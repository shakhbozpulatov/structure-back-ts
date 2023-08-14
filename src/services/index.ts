import { HttpException } from "@exceptions/HttpException";
import { response } from "express";
import * as crypto from "crypto";
// import fetch from "node-fetch";

interface smsData {
  phoneNumber: string;
}

export class PhoneServices {
  phone_number: string;

  constructor(phone_number: string) {
    this.phone_number = phone_number;
  }
  sendSms(user) {
    try {
      fetch("https://notify.eskiz.uz/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "shakhbozpulatovdev@gmail.com",
          password: "1phX0xtc1B6hrkDBLxv2BWtBrJqq4un6a36YyLL1",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result: any) => {
          const token = result.data?.token;
          const code = crypto.randomInt(100000, 999999);
          let cut_phone = this.phone_number;
          fetch("https://notify.eskiz.uz/api/message/sms/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              mobile_phone: cut_phone,
              message: code,
              from: 4546,
            }),
            redirect: "follow",
          })
            .then((response) => response.json())
            .then((result) => {
              response.status(201).json({
                success: true,
                msg: "Success",
                data: user,
              });
              const verification = new Verification({
                code: code,
                user_id: user._id,
                phone_number: phone_number,
              });
              verification
                .save()
                .then((resp) => {
                  console.log(resp);
                })
                .catch(next);
            });
        });
    } catch (err) {
      return new HttpException(500, err);
    }
  }
}
