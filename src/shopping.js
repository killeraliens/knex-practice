const knex = require('knex')
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const ShoppingListService = require('./shopping-list-service');

console.log('shopping controller no errors')
