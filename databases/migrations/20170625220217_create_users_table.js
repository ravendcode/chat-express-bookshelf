
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('token');
    table.string('name').unique();
    table.string('email', 128).notNullable().unique();
    table.string('password').notNullable();
    table.boolean('is_staff').defaultTo(false);
  // table.string('role').defaultTo('admin');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
