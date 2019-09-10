//functions for adding/updating/find/findById here

const db = require("../database/dbConfig.js");

module.exports = {
  add,
  update,
  find,
  findById
};

function find() {
  return db("acts").select("id", "contact_id", "description");
}

function findById(id) {
  return db("acts")
    .where("id")
    .first();
}

async function add(act) {
  const [id] = await db("acts").insert(act);
  return findById(id);
}

function update(id, changes) {
  return db("acts")
    .where({ id })
    .update({ changes });
}
