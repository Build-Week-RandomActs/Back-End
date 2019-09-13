//testing for acts-router

const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Acts = require("./acts-model.js");

let token;

beforeAll(done => {
  request(server)
    .post("/api/auth/login")
    .send({ username: "cms9", password: "derpderpderp" })
    .end((error, response) => {
      token = response.body.token;
      done();
    });
});

describe("GET /", () => {
  //token not sent, respond w/ 401
  it("should return 400", async () => {
    const res = await request(server).get("/api/acts");
    expect(res.status).toBe(400);
  });

  //token sent
  it("should return JSON", () => {
    return request(server)
      .get("/api/acts")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
});

describe("GET /:id", () => {
  it("should return an act", async () => {
    const act = await db("acts").where({ id: 2 });
    return request(server)
      .get("/api/acts/2")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
});

describe("Add", () => {
  it("should insert act", async () => {
    await Acts.add({
      contact_id: 2,
      description: "this is a third test act"
    });
    const acts = await db("acts");

    return request(server)
      .post("/api/acts/")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(acts.length).not.toBeLessThan(3);
      });
  });
});

// describe("Update", () => {
//   it("should update act", async () => {
//     await Acts.update({ id: 1, contact_id: 1, description: "derp" });
//     const updated = await db("acts").where({ id: 1 });
//
//     return request(server)
//       .put("/api/acts/1")
//       .set("Authorization", `${token}`)
//       .then(res => {
//         expect(updated.description).toBe("updated test description");
//       });
//   });
// });

// describe("GET /users", function() {
//   it("responds with json", function() {
//     return request(server)
//       .get("/users")
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200)
//       .then(response => {
//         assert(response.body.email, "foo@bar.com");
//       });
//   });
// });
