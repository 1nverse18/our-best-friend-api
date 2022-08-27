// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
  module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'Tiraler12!',
        database: 'our_best_friend',
        charset: 'utf8',
      },
    }
  };
