// const expect = require("chai").expect;
// const request = require("supertest");
// const { app } = require("../../src/server");
// const db = require("../../src/db");
// const database = new db();
// const sinon = require("sinon");

// describe("testing register", () => {
//   before(done => {
//     database
//       .startConnection()
//       .then(() => done())
//       .catch(err => done(err));
//   });

//   after(done => {
//     database
//       .dropDb()
//       .then(() => {
//         database.disconnect().then(() => done());
//       })
//       .catch(err => done(err));
//   });

//   const userToRegister = {
//     email: "test@gmail.com",
//     username: "TestUser",
//     password: "testingpassword"
//   };

//   it("Can register user", done => {
//     request(app)
//       .post("/api/auth/register")
//       .send(userToRegister)
//       .then(res => {
//         expect(res.body).to.contain.property("token");
//         expect(res.body).to.contain.property("_id");
//         expect(res.body).to.contain.property("email");
//         expect(res.body).to.contain.property("username");
//         expect(res.body).to.contain.property("hash");
//         expect(res.statusCode).to.equal(201);
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("Cant register if email and username are the same", done => {
//     request(app)
//       .post("/api/auth/register")
//       .send(userToRegister)
//       .then(res => {
//         expect(res.body.error).to.equal("Email and Username is already taken");
//         expect(res.statusCode).to.equal(400);
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("Cant register if email are the same", done => {
//     request(app)
//       .post("/api/auth/register")
//       .send({
//         email: "test@gmail.com",
//         username: "testUserTwo",
//         password: "testing password"
//       })
//       .then(res => {
//         expect(res.body.error).to.equal("Email is already taken");
//         expect(res.statusCode).to.equal(400);
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("Cant register if email are the same", done => {
//     request(app)
//       .post("/api/auth/register")
//       .send({
//         email: "testTwo@gmail.com",
//         username: "TestUser",
//         password: "testing password"
//       })
//       .then(res => {
//         expect(res.body.error).to.equal("Username is already taken");
//         expect(res.statusCode).to.equal(400);
//         done();
//       })
//       .catch(err => done(err));
//   });
// });

// describe("testing register", () => {
//   before(done => {
//     database
//       .startConnection()
//       .then(() => done())
//       .catch(err => done(err));
//   });

//   after(done => {
//     database
//       .dropDb()
//       .then(() => {
//         database.disconnect().then(() => done());
//       })
//       .catch(err => done(err));
//   });

//   const userToRegister = {
//     email: "test@gmail.com",
//     username: "TestUser",
//     password: "testingpassword"
//   };

//   var token;

//   it("Can login user", done => {
//     request(app)
//       .post("/api/auth/register")
//       .send(userToRegister)
//       .then(res => {
//         expect(res.statusCode).to.equal(201);
//         request(app)
//           .post("/api/auth/login")
//           .send({ email: "test@gmail.com", password: "testingpassword" })
//           .then(resL => {
//             token = resL.body.token;
//             expect(resL.statusCode).to.equal(200);
//             expect(resL.body).to.contain.property("token");
//             expect(resL.body).to.contain.property("decodedToken");
//             expect(resL.body.decodedToken).to.contain.property("exp");
//             expect(resL.body.decodedToken).to.contain.property("iat");
//             done();
//           });
//       })
//       .catch(err => done(err));
//   });
//   const WrongCred = "Wrong credentials.";
//   it("Cant register user if email is wrong email", done => {
//     request(app)
//       .post("/api/auth/login")
//       .send({ email: "testWrong@gmail.com", password: "testingpassword" })
//       .then(res => {
//         expect(res.statusCode).to.equal(401);
//         expect(res.body.error).to.equals(WrongCred);
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("Cant register user if email is wrong password", done => {
//     request(app)
//       .post("/api/auth/login")
//       .send({ email: "test@gmail.com", password: "testingpasswordWrong" })
//       .then(res => {
//         expect(res.statusCode).to.equal(401);
//         expect(res.body.error).to.equals(WrongCred);
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("The token is expired", done => {
//     // Fakiamos la hora
//     clock = sinon.useFakeTimers(new Date(2050, 1, 1));
//     request(app)
//       .post("/api/auth/login")
//       .send({ email: "test@gmail.com", password: "testingpassword" })
//       .then(res => {
//         expect(res.statusCode).to.equal(200);
//         expect(res.body.token).to.not.equals(token);
//         clock.restore();
//         done();
//       })
//       .catch(err => done(err));
//   });
// });
