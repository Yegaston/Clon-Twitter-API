const expect = require("chai").expect;
const request = require("supertest");
const Post = require("../../src/models/postSchema");
const { app } = require("../../src/server");
const db = require("../../src/db");

const database = new db();

describe.only("Tests api /posts", async () => {
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
  let token;
  it.only("OK, creating a new post works", done => {
    request(app)
      .post("/api/auth/register")
      .send({
        email: "test@test.com",
        password: "test123test",
        username: "testea2"
      })
      .then(res => {
        console.log("depuring ->> ", res);
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.contain.property("token");
        token = res.body.token;
        request(app)
          .post("/api/post")
          .send({
            body: "Lo unico raro fue que no imagino lo que podria venirr"
          })
          .set({ Authorization: token })
          .then(res => {
            expect(res.body).to.contain.property("_id");
            expect(res.body).to.contain.property("author");
            expect(res.body.author).to.equal("testea2");
            postId = res.body._id;
            expect(res.statusCode).to.equal(201);
            done();
          });
      })
      .catch(err => done(err));
  });

  it("Can find post with id", done => {
    request(app)
      .get(`/api/post/${postId}`)
      .then(res => {
        expect(res.body[0])
          .to.contain.property("_id")
          .equals(postId);
        done();
      })
      .catch(err => done(err));
  });

  it("The post dont have a body.", done => {
    request(app)
      .post("/api/post")
      .send({
        author: "Yegaston",
        body: ""
      })
      .set({ Authorization: token })
      .then(res => {
        expect(res.body).to.contain.property("error");
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });

  it("Getting all posts", done => {
    request(app)
      .get("/api/posts")
      .then(res => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Can delete post with id", done => {
    request(app)
      .delete(`/api/post/${postId}`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.contain.property("postDelete");
        done();
      });
  });

  it("Can delete post with id", done => {
    request(app)
      .delete(`/api/post/${postId}`)
      .then(res => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.contain.property("postDoestExist");
        done();
      });
  });

  it("Getting none posts", done => {
    Post.db.dropDatabase();
    request(app)
      .get("/api/posts")
      .then(res => {
        expect(res.body).to.contain.property("collection");
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it("Can find post with id", done => {
    request(app)
      .get(`/api/post/${postId}`)
      .then(res => {
        expect(res.body)
          .to.contain.property("postDoestExist")
          .equals(postId);
        done();
      })
      .catch(err => done(err));
  });
});
