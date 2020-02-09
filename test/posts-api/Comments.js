const expect = require("chai").expect;
const request = require("supertest");
const { app } = require("../../src/server");
const db = require("../../src/db");
const database = new db();

describe("tests /api/comment", async () => {
  before(done => {
    database
      .startConnection()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    database
      .endTest()
      .then(() => {
        done();
      })
      .catch(err => {
        done(err);
        console.error(err);
      });
  });

  let postId;
  let token;

  it("OK, creating a new comment works", done => {
    request(app)
      .post("/api/auth/register")
      .send({
        email: "test@test.com",
        password: "test123test",
        username: "testea2"
      })
      .then(res => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.contain.property("token");
        token = res.body.token;
        request(app)
          .post("/api/post")
          .send({
            body: "Lo unico raro fue que no imagino lo que podria venirr"
          })
          .set({ Authorization: `Bearer ${token}` })
          .then(res => {
            postId = res.body._id;
            expect(res.statusCode).to.equal(201);
            request(app)
              .post(`/api/comment/${postId}`)
              .send({ body: "Soy un comentario." })
              .set({ Authorization: `Bearer ${token}` })
              .then(resC => {
                expect(resC.statusCode).to.equal(201);
                expect(resC.body.postId).to.equal(postId);
                expect(resC.body).to.contain.property("body");
                expect(resC.body).to.contain.property("author");
                done();
              });
          });
      })
      .catch(err => done(err));
  });

  it("test cant create a comment if dont auth", done => {
    request(app)
      .post(`/api/comment/${postId}`)
      .send({ body: "" })
      .then(res => {
        expect(res.statusCode).to.equal(401);
        done();
      })
      .catch(err => done(err));
  });
});
