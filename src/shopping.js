require('dotenv').config()
const knex = require('knex')
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

const ShoppingListService = require('./shopping-list-service');



ShoppingListService.getAllItems(knexInstance)
  .then(items => {
    console.log(items)
    const newItem = {
      name: 'BronziBurger', price: '100.50', category: 'Main', checked: false, date_added: new Date()
    }
    return ShoppingListService.insertNewItem(knexInstance, newItem)
  })
  .then(newItem => {
    console.log(newItem)
    const newData = { name: 'RuBurger'}
    return ShoppingListService.updateItem(knexInstance, newItem.id, newData)
      .then(() => ShoppingListService.getItemById(knexInstance, newItem.id))
  })
  .then(updatedItem => {
    console.log(updatedItem)
    return ShoppingListService.deleteItem(knexInstance, updatedItem.id)
  })
  .then(() => {
    return ShoppingListService.deleteAll(knexInstance)
  })
