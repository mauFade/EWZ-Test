import AuthController from "../controllers/AuthController";
import { Request, Response } from "express";

describe("Auhtentication controller tests", () => {
  it("Should return error", async () => {
    const req = {
      body: {
        email: "",
        password: "somepassword123",
      },
    };

    await expect(AuthController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        email: "somemeail@email.com",
        password: "",
      },
    };

    await expect(AuthController.create(req as Request, {} as Response)).rejects.toThrow();
  });
});
