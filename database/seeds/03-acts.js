exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("acts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("acts").insert([
        { contact_id: 1, description: "this is a test act" },
        { contact_id: 2, description: "this is another test act" }
      ]);
    });
};
