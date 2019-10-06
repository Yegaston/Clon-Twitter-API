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
      .dropDb()
      .then(() => {
        database.disconnect().then(() => done());
      })
      .catch(err => done(err));
  });

  let postId;
  it("test can create a comment", done => {
    request(app)
      .post("/api/post")
      .send({
        author: "yegaston",
        body: "Buscamos vida en algun lugar, al reparo de un mundo, sin reparo."
      })
      .then(res => {
        postId = res.body._id;
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
      })
      .catch(error => done(error));
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
