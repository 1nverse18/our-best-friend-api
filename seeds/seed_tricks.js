/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

 const tricksData = require('../seed_data/tricks');

 exports.seed = function (knex) {
  return knex('tricks')
    .del()
    .then(function () {
      return knex('tricks').insert(tricksData);
    })
};
