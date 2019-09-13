//testing for contacts-router

const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Contacts = require("./contacts-model.js");

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
    const res = await request(server).get("/api/contacts");
    expect(res.status).toBe(400);
  });

  //token sent
  it("should return JSON", () => {
    return request(server)
      .get("/api/contacts")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
});

describe("GET /:id", () => {
  it("should return a contact", async () => {
    const contact = await db("contacts").where({ id: 2 });
    return request(server)
      .get("/api/contacts/2")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
});

describe("Add", () => {
  it("should insert contact", async () => {
    await Contacts.add({
      user_id: 2,
      name: "claire",
      email: "claireclaire@claire.com"
    });
    const contacts = await db("contacts");

    return request(server)
      .post("/api/contacts/")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(contacts.length).not.toBeLessThan(3);
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
