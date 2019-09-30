const expect = require("chai").expect;
const request = require("supertest");
const chaiHttp = require("chai-http");
const { app } = require("../../src/server");
const db = require("../../src/db");

const database = new db();

const post = {};

describe("post /notes", () => {
  before(done => {
    database
      .startConnection()
      .then(() => done())
      .catch(err => done(err));
  });
  after(done => {
    database
      .disconnect()
      .then(() => done())
      .catch(err => done(err));
  });

  it("OK, creating a new post works", done => {
    request(app)
      .post("/api/post")
      .send({
        author: "Yegaston",
        body: "asd",
        comments: [
          {
            body: "Afa afa farte"
          }
        ],
        meta: {
          likes: 0,
          clicks: 0
        }
      })
      .set("Accept", "application/json")
      .then(res => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.contain.property("_id");
        done();
      })
      .catch(err => done(err));
  });

  it("The post dont have a title.", done => {
    request(app)
      .post("/api/post")
      .send({
        author: "Yegaston",
        body: "",
        comments: [
          {
            body: "Afa afa farte"
          }
        ],
        meta: {
          likes: 0,
          clicks: 0
        }
      })
      .set("Accept", "application/json")
      .then(res => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.contain.property("error");
        done();
      })
      .catch(err => done(err));
  });
});
