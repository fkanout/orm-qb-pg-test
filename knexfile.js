// Update with your config settings.

module.exports = {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   },
  //   migrations: {
  //     directory: `${__dirname}/db/migrations`,
  //     tableName: 'knex_migrations'
  //   },
  //   useNullAsDefault: true
  // },

  development: {
    client: 'pg',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: `${__dirname}/db/migrations`,
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
