const request = require("supertest");
const express = require("express");
const app = express();

describe("GET /api", () => {
  it("Reciving posts??", async () => {
    request(app)
      .get("/api")
      .expect(200);
  });
});
