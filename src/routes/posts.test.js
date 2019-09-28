const supertest = require("supertest");
// const posts = require("./posts");

const { app } = require("../server");

afterEach(async () => {});
describe("GET /api", () => {
  const agent = supertest.agent(app);
  it("Reciving posts??", async () => {
    agent
      .get("/api")
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
