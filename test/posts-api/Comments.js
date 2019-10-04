const expect = require("chai").expect;
const request = require("supertest");
const Comment = require("../../test/posts-api/Posts");
const { app } = require("../../src/server");
const db = require("../../src/db");
const database = new db();
const postO = {
  author: "Yegaston",
  body: "Lo unico raro fue que no imagino lo que podria venirr"
};
commentO = {
  author: "Ciro",
  body: "Otro comentario dea"
};
describe("tests /api/comment", async () => {
  before(done => {
    database
      .startConnection()
      .then(() => done())
      .catch(err => done(err));
  });
  after(done => {
    database
      .dropDb()
      .then(() => {
        database.disconnect().then(() => done());
      })
      .catch(err => done(err));
  });
  let postId;

  it("Can create a new comment", async () => {
    try {
      const resP = await request(app)
        .post("/api/post")
        .send(postO);
      postId = resP.body._id;

      const resM = await request(app)
        .post("/api/post")
        .send(commentO);
      postId = resM.body._id;

      expect(resM.body).to.contain.property("_id");
      expect(resM.body).to.contain.property("body");
      expect(resM.body).to.contain.property("author");
      expect(res.statusCode).to.equal(200);

      done();
    } catch (error) {}
  });

  it("Cant create a new comment if body or author is missing", async () => {
    try {
      const resP = await request(app)
        .post("/api/post")
        .send(postO);
      postId = resP.body._id;

      const resM = await request(app)
        .post("/api/post")
        .send(commentO);
      postId = resM.body._id;

      expect(resM.body).to.contain.property("error");
      expect(res.statusCode).to.equal(400);

      done();
    } catch (error) {}
  });
});
