const request = require("supertest");
const express = require("express");
const server = require('../server');


describe("GET /api", () => {
  it("Reciving posts??", async() => {
    request(server)
      .get("/api")
      .expect(200);
  });
});
