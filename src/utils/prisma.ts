import { PrismaClient } from "@prisma/client";

class PrismaInstance {
  protected static instance: PrismaClient;
  private constructor() {}

  public static getInstance = () => {
    if (this.instance === undefined) {
      this.instance = new PrismaClient();
    }

    return this.instance;
  };
}

export default PrismaInstance.getInstance();
