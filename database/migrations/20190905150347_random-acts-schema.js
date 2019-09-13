exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .text("username", 128)
        .unique()
        .notNullable();
      tbl.text("password").notNullable();
      tbl
        .text("email")
        .notNullable()
        .unique();
    })
    .createTable("contacts", tbl => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("name", 256).notNullable();
      tbl.text("email").notNullable();
    })
    .createTable("acts", tbl => {
      tbl.increments();
      tbl
        .integer("contact_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("contacts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl.text("description").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("acts")
    .dropTableIfExists("contacts")
    .dropTableIfExists("users");
};
