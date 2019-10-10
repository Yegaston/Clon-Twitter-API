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
              .send({ author: "Forgi", body: "Soy un comentario." })
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

  it("test cant create a comment if dont have body and author", done => {
    request(app)
      .post(`/api/comment/${postId}`)
      .send({ body: "", author: "" })
      .then(res => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.contain.property("clientError");
        done();
      })
      .catch(err => done(err));
  });

  it("test cant create a comment if dont have body and author", done => {
    request(app)
      .post(`/api/comment/5d9942720fb41336e4c72dc2`)
      .send({ body: "asd", author: "ads" })
      .then(res => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.contain.property("PostDontExist");
        done();
      })
      .catch(err => done(err));
  });
});
