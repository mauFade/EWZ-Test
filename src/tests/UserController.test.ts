import UserController from "../controllers/UserController";
import { Request, Response } from "express";

describe("User controller tests", () => {
  it("Should return error", async () => {
    const req = {
      body: {
        name: "",
        email: "test@test.com",
        password: "testest123",
      },
    };

    await expect(UserController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        name: "Some Name",
        email: "",
        password: "testest123",
      },
    };

    await expect(UserController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        name: "Some Name",
        email: "test@test.com",
        password: "",
      },
    };

    await expect(UserController.create(req as Request, {} as Response)).rejects.toThrow();
  });
});
