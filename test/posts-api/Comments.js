// const expect = require("chai").expect;
// const request = require("supertest");
// const { app } = require("../../src/server");
// const db = require("../../src/db");
// const database = new db();

// describe("tests /api/comment", async () => {
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
//   let postId;
//   it("OK, creating a new post works", done => {
//     request(app)
//       .post("/api/post")
//       .send({
//         author: "Yegaston",
//         body: "Lo unico raro fue que no imagino lo que podria venirr"
//       })
//       .then(res => {
//         expect(res.body).to.contain.property("_id");
//         postId = res.body._id;
//         done();
//       })
//       .catch(err => done(err));
//   });

//   it("Creating a comment", done => {
//     request(app)
//       .post(`/api/comment/${postId}`)
//       .send({ body: "Soy el comentario", author: "Autor" })
//       .then(res => {
//         expect(res.body).to.contain.property("_id");
//         expect(res.body).to.contain.property("body");
//         expect(res.body).to.contain.property("author");
//         done();

//       })
//       .catch(err => done(err));
//   });

//   it("If not body and autor retunr error?", done => {
//     request(app)
//       .post(`/api/comment/${postId}`)
//       .send({ body: "", author: "" })
//       .then(res => {
//         expect(res.statusCode).to.equal(400);
//         done();
//       })
//       .catch(err => done(err));
//   });
// });
