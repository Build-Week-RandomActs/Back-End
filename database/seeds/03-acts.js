exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { contact_id: 1, description: "this is a test act" },
        { contact_id: 2, description: "this is another test act" }
      ]);
    });
};
