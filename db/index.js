
const environment = process.env.NODE_ENV || 'development';
const { Model } = require('objection');
const config = require('../knexfile')[environment];
const knex = require('knex')(config)
Model.knex(knex);

exports.Model = Model
exports.knex = knex