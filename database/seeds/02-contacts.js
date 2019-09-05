exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        {
          user_id: 1,
          name: "test mctesterson",
          email: "testmctesterson@test.com"
        },
        {
          user_id: 1,
          name: "testy mctestpants",
          email: "testymctestpants@test.com"
        }
      ]);
    });
};
