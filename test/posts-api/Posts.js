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

  it("register user and posting", done => {
    request(app)
      .send({
        email: "test@gmail.com",
        username: "testea2",
        password: "testpass"
      })
      .then(res => {
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch(err => done(err));
  });

  // it("Get empty collection posts", done => {
  //   request(app)
  //     .get("/api/posts")
  //     .then(res => {
  //       console.log(res);
  //       done();
  //     })
  //     .catch(err => done(err));
  // });
});
