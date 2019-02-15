
exports.up = function(knex, Promise) {
  return  knex.schema.alterTable('offerings',(table)=>{
    table.string('category').notNullable().alter()
    table.string('governance').notNullable().alter()
  })
};

exports.down = function(knex, Promise) {
  
};
