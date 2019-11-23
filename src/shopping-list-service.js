
const ShoppingListService = {
  getAllItems(knex) {
    return knex
      .select('*')
      .from('shopping_list')
  },

  getItemById(knex, id) {
    return knex
      .select('*')
      .from('shopping_list')
      .where('id', id)
      .first()
  },

  insertNewItem(knex, newData) {
    return knex
      .insert(newData)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0])
  },

  deleteItem(knex, id) {
    return knex
      .from('shopping_list')
      .where('id', id)
      .delete()
  },

  updateItem(knex, id, newData) {
    return knex
      .from('shopping_list')
      .where('id', id)
      .update(newData)
  }

}

module.exports = ShoppingListService;
