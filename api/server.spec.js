const request = require("supertest");
const server = require("./server.js");

describe("GET /", () => {
  it("should return a json string", () => {
    const res = request(server).get("/");
    expect.anything();
  });
});
