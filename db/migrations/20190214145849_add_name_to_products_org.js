
exports.up = function(knex, Promise) {
  return knex.schema.table('organizations', function(table) {
        table.string('name').notNull()
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('organizations', function(table) {
        table.dropColumn('name')
    });
};
