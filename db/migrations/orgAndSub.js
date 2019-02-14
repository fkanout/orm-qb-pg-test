
exports.up = function(knex, Promise) {
    const createOrganizations = knex.schema
        .createTable('organizations', (table) => {
            table.uuid('id').notNullable().primary();
            table.string('referenceId').nullable();
            table.string('sourceName').nullable();
            table.string('sourceOrganizationId').nullable()
            table.index('sourceOrganizationId')
            table.boolean('migrated').notNullable().defaultTo(false)
            table.boolean('manuallyTerminated').nullable().defaultTo(false)
            table.string('region').nullable()
            table.string('domain').nullable()
            table.string('lastModifiedVia').notNullable()
            table.boolean('isComplete').nullable().defaultTo(true)
            table.timestamp('creationDate').notNullable()
            table.timestamp('modificationDate').notNullable()
        });

    const createSubscription = knex.schema
        .createTable('subscriptions', (table) => {
            table.uuid('id').notNullable().primary();
            table.string('name').notNullable();
            table.string('status').notNullable();
            table.boolean('autoRenew').notNullable().defaultTo(false)
            table.string('lastModifiedVia').notNullable()
            table.uuid('organizationId').notNullable()
            table.foreign('organizationId').references('id').on('organizations')
            table.date('startDate').notNullable()
            table.date('endDate').notNullable()
            table.boolean('isComplete').nullable().defaultTo(true)
            table.timestamp('creationDate').notNullable()
            table.timestamp('modificationDate').notNullable()
        });
    return Promise.all([createOrganizations, createSubscription])
};

exports.down = function(knex, Promise) {
  
};
