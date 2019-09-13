const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Users = require("./users-model.js");

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
    const res = await request(server).get("/api/users");
    expect(res.status).toBe(400);
  });

  //token sent
  it("should return JSON", () => {
    return request(server)
      .get("/api/users")
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
      });
  });
});
