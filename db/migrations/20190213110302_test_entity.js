
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('user', (table) => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('emailAddress');
        });

};

exports.down = function(knex, Promise) {
  
};
