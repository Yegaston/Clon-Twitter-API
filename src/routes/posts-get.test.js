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

const post = {
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
};

describe("POST /api", () => {
  const agent = supertest.agent(app);
  it("Can create post??", async () => {
    agent.post("/api/posts", post);
  });
});
