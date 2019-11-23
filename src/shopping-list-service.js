
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
  }

}

module.exports = ShoppingListService;
