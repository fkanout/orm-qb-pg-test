
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('pet', (table) => {
        table.increments('id').primary();
        table.string('type');
        table.string('name');
        table.string('emailAddress');
        table.integer('owner').unsigned()
        table.foreign('owner').references('id').on('user')
    });
};

exports.down = function(knex, Promise) {
  
};
