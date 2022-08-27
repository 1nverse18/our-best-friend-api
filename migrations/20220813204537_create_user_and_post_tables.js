/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.integer('github_id').notNullable();
        table.string('avatar_url').notNullable();
        table.string('username').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('play_dead_comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title', 75 ).notNullable();
        table.text('content').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('spin_comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title', 75 ).notNullable();
        table.text('content').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('roll_over_comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title', 75 ).notNullable();
        table.text('content').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('shake_comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title', 75 ).notNullable();
        table.text('content').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('stand_comments', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('title', 75 ).notNullable();
        table.text('content').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table
          .foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      })
      .createTable('tricks', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('content').notNullable();
        table.integer('quantity').notNullable().defaultTo(0);
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTable('tricks')
    .dropTable('posts')
    .dropTable('users')
    .dropTable('play_dead_comments')
    .dropTable('spin_comments')
    .dropTable('stand_comments')
    .dropTable('shake_comments')
    .dropTable('roll_over_comments')
  };