import DealsController from "../controllers/DealsController";
import { Request, Response } from "express";

describe("Deals controller tests", () => {
  it("Should return error", async () => {
    const req = {
      body: {
        title: "",
        description: "Deal description",
        value: 500,
        status: "Deal status",
      },
    };

    await expect(DealsController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        title: "Deal title",
        description: "",
        value: 500,
        status: "Deal status",
      },
    };

    await expect(DealsController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        title: "Deal title",
        description: "Deal description",
        value: null,
        status: "Deal status",
      },
    };

    await expect(DealsController.create(req as Request, {} as Response)).rejects.toThrow();
  });

  it("Should return error", async () => {
    const req = {
      body: {
        title: "Deal title",
        description: "Deal description",
        value: 500,
        status: "",
      },
    };

    await expect(DealsController.create(req as Request, {} as Response)).rejects.toThrow();
  });
});
