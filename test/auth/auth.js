const expect = require("chai").expect;
const request = require("supertest");
const { app } = require("../../src/server");
const db = require("../../src/db");
const database = new db();

describe("testing register", () => {
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

  const userToRegister = {
    email: "test@gmail.com",
    username: "TestUser",
    password: "testingpassword"
  };

  it("Can register user", done => {
    request(app)
      .post("/api/auth/register")
      .send(userToRegister)
      .then(res => {
        expect(res.body).to.contain.property("token");
        expect(res.body).to.contain.property("_id");
        expect(res.body).to.contain.property("email");
        expect(res.body).to.contain.property("username");
        expect(res.body).to.contain.property("hash");
        expect(res.statusCode).to.equal(201);
        done();
      })
      .catch(err => done(err));
  });

  it("Cant register if email and username are the same", done => {
    request(app)
      .post("/api/auth/register")
      .send(userToRegister)
      .then(res => {
        expect(res.body.error).to.equal("Email and Username is already taken");
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });

  it("Cant register if email are the same", done => {
    request(app)
      .post("/api/auth/register")
      .send({
        email: "test@gmail.com",
        username: "testUserTwo",
        password: "testing password"
      })
      .then(res => {
        expect(res.body.error).to.equal("Email is already taken");
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });

  it("Cant register if email are the same", done => {
    request(app)
      .post("/api/auth/register")
      .send({
        email: "testTwo@gmail.com",
        username: "TestUser",
        password: "testing password"
      })
      .then(res => {
        expect(res.body.error).to.equal("Username is already taken");
        expect(res.statusCode).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });
});
