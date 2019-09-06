//db config belongs here. will need to add seeds and migrations to this folder.
const knex = require('knex')

const knexConfig = require('../knexfile.js')

module.exports = knex(knexConfig.development)
