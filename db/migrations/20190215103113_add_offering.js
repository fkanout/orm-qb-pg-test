
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('offerings', (table) => {
            table.uuid('id').notNullable().primary();
            table.string('name').notNullable();
            table.string('description').nullable();
            table.string('type').nullable()
            table.string('tier').notNullable()
            table.boolean('category').notNullable().defaultTo(false)
            table.boolean('governance').nullable().defaultTo(false)
            table.uuid('offeringTemplateId')
            table.integer('offeringTemplateVersion')
            table.boolean('modified').notNullable().defaultTo(false)

            table.uuid('subscriptionId').nullable()
            table.foreign('subscriptionId').references('id').on('subscriptions')
            table.index('subscriptionId')

            table.timestamp('startDate').nullable()
            table.timestamp('endDate').nullable()
            table.string('lastModifiedVia').notNullable()
            
            table.boolean('isComplete').notNullable().defaultTo(true)
            table.boolean('hidden').nullable().defaultTo(false)

            table.timestamp('creationDate').notNullable()
            table.timestamp('modificationDate').notNullable()
        });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('offerings')
};
