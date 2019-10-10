const expect = require("chai").expect;
const request = require("supertest");
const Post = require("../../src/models/postSchema");
const { app } = require("../../src/server");
const db = require("../../src/db");

const database = new db();

describe("Tests api /posts", () => {
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
  it("Get empty collection posts", done => {
    request(app)
      .get("/api/posts")
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.contain.property("collection");
        done();
      })
      .catch(err => done(err));
  });

  it("register user and posting", done => {
    request(app)
      .post("/api/auth/register")
      .send({
        email: "test@gmail.com",
        username: "testea2",
        password: "testpass"
      })
      .then(res => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.contain.property("token");
        token = res.body.token;
        request(app)
          .post("/api/post")
          .send({ body: "Soy el post ndea" })
          .set({ Authorization: `Bearer ${token}` })
          .then(res => {
            expect(res.body).to.contain.property("author");
            postId = res.body._id;
            expect(res.body.author).to.equal("testea2");
            expect(res.body).to.contain.property("body");
            expect(res.statusCode).to.equal(201);
            done();
          });
      })
      .catch(err => done(err));
  });

  it("refuse if no body", done => {
    request(app)
      .post("/api/post")
      .send({ body: "" })
      .set({ Authorization: `Bearer ${token}` })
      .then(res => {
        expect(res.body).to.contain.property("error");
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });

  it("getting posts", done => {
    request(app)
      .get("/api/posts")
      .then(res => {
        expect(res.body[0]).to.contain.property("_id");
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done(err));
  });

  it("get post with id", done => {
    request(app)
      .get(`/api/post/${postId}`)
      .then(res => {
        expect(res.body._id).to.equal(postId);
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done(err));
  });

  it("Can delete post", done => {
    request(app)
      .delete(`/api/post/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .then(res => {
        expect(res.body.postDelete).to.equal(postId);
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done(err));
  });

  it("Can delete post", done => {
    request(app)
      .delete(`/api/post/${postId}`)
      .set({ Authorization: `Bearer ${token}` })
      .then(res => {
        expect(res.body).to.contain.property("postDoestExist");
        expect(res.statusCode).to.equal(200);
        done();
      })
      .catch(err => done(err));
  });
});
