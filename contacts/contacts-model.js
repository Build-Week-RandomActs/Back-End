//functions for find/findBy/add/delete/etc. here

const db = require("../database/dbConfig.js");

module.exports = {
  add,
  update,
  find,
  findById
};

function find() {
  return db("contacts").select("id", "contact_id", "description");
}

function findById(id) {
  return db("contacts")
    .where("id")
    .first();
}

async function add(act) {
  const [id] = await db("contacts").insert(act);
  return findById(id);
}

function update(id, changes) {
  return db("contacts")
    .where({ id })
    .update({ changes });
}
