const supertest = require("supertest");
const { app } = require("../server");
// const postSchema = require("../models/postSchema");
const db = require("../db");
beforeEach(async () => {
  const database = new db();
  await database.startConnection();
});
afterEach(async () => {
  const database = new db();
  await database.disconnect();
});
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
  it("Can create post??", async () => {
    agent
      .post("/api/posts")
      .send({
        _id: "5d9022b6db5df8220c8108e0",
        author: "Yegaston",
        body: "Ndeah picantovich",
        comments: [
          {
            _id: "5d9022b6db5df8220c8108e1",
            body: "Afa afa farte"
          }
        ],
        meta: {
          likes: 0,
          clicks: 0
        },
        date: "2019-09-29T03:19:18.286Z",
        __v: 0
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
  it("Cant create post when body is empty??", async () => {
    agent
      .post("/api/posts")
      .send({
        _id: "5d9022b6db5df8220c8108e0",
        author: "Yegaston",
        body: "Ndeah picantovich",
        comments: [
          {
            _id: "5d9022b6db5df8220c8108e1",
            body: "Afa afa farte"
          }
        ],
        meta: {
          likes: 0,
          clicks: 0
        },
        date: "2019-09-29T03:19:18.286Z",
        __v: 0
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) throw err;
      });
  });
});
