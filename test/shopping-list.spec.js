const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')


describe('ShoppingListService object', () => {
  let db;

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })

  before(() => {
    return db('shopping_list').truncate()
  })

  afterEach(() => {
    return db('shopping_list').truncate()
  })

  after(() => { db.destroy()})

  context('with data in shopping_list table', () => {
    const today = new Date();
    const testItems = [
      { id: 1, name: 'Burgatory', price: '1.50', category: 'Main', checked: false, date_added: today},
      { id: 2, name: 'Sleight of Ham', price: '3.10', category: 'Lunch', checked: false, date_added: today },
      { id: 3, name: 'Antichovies', price: '1.00', category: 'Breakfast', checked: false, date_added: today }
    ]

    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it('getAllItems() resolves with all items from shopping_list table', () => {
      return ShoppingListService
        .getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    })

    it('getItemById() resolves with correct item from shopping_list table', () => {
      return ShoppingListService
        .getItemById(db, testItems[1].id)
        .then(actual => {
          expect(actual).to.eql(testItems[1])
        })
    })

    it('deleteItem() removes item with id from shopping_list table', () => {
      return ShoppingListService
        .deleteItem(db, testItems[1].id)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(item => testItems[1].id !== item.id)
          expect(allItems).to.eql(expected)
        })
    })

    it('updateItem() resolves with updated item from shopping_list table', () => {
      const newData = { name: 'chopped liver', checked: true, date_added: new Date}
      return ShoppingListService
        .updateItem(db, testItems[1].id, newData)
        .then(() => ShoppingListService.getItemById(db, testItems[1].id))
        .then(actual => {
          expect(actual).to.eql({
            ...newData,
            category: testItems[1].category,
            price: testItems[1].price,
            id: testItems[1].id })
        })
    })
  })


  context('given there is no data in shopping_list table', () => {
    it('getAllItems() resolves with an empty array from shopping_list table', () => {
      return ShoppingListService
        .getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it('insertNewItem() resolves with new item with id to shopping_list table', () => {
      const newItem = {
        name: 'New foood',
        price: '3.10',
        category: 'Lunch',
        checked: false,
        date_added: new Date()
      }

      const newItem2 = {
        name: 'New foood2',
        price: '3.10',
        category: 'Lunch',
        checked: false,
        date_added: new Date()
      }

      return ShoppingListService
        .insertNewItem(db, newItem)
        .then(() => { return ShoppingListService.insertNewItem(db, newItem2)})
        .then(actual => {
          expect(actual).to.eql({...newItem2, id: 2})
        })
    })

  })
})
