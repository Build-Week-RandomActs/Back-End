//testing for auth router

const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");
const Users = require("../users/users-model.js");

describe("Register", () => {
  it("should insert user", async () => {
    await Users.add({
      username: "clairederp",
      email: "derp@claire.com",
      password: "derpderp"
    });
    const users = await db("users");

    return request(server)
      .post("/api/auth/register")
      .then(res => {
        expect(users.length).not.toBeLessThan(3);
      });
  });
});

describe("Login", () => {
  it("should log in", async () => {
    await Users.findBy({ username: "cms9" }).first();
    const user = await db("users").where({ username: "cms9" });

    return request(server)
      .post("/api/auth/login")
      .then(res => {
        expect.arrayContaining({ username: "cms9" });
      });
  });
});
