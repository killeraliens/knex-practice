require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const ArticlesService = require('./articles-service');


//console.log(ArticlesService.quickQuery(knexInstance));
//ArticlesService.quickQuery(knexInstance);

