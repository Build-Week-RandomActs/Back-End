//functions for find/findBy/add/delete/etc. here

const db = require("../database/dbConfig.js");

module.exports = {
  add,
  update,
  find,
  findById
};

function find() {
  return db("contacts").select("id", "user_id", "name", "email");
}

function findById(id) {
  return db("contacts")
    .where({ id })
    .first();
}

async function add(act) {
  const [id] = await db("contacts").insert(contact);
  return findById(id);
}

function update({ name, email }, id) {
  return db("contacts")
    .where({ id })
    .update({ name, email });
}
