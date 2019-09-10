const db = require("../database/dbConfig.js");

module.exports = {
  add,
  update,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("username", "email");
}

function findBy(filter) {
  return db("users").where("filter");
}

function findById(id) {
  return db("users")
    .where("id")
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update({ changes });
}
