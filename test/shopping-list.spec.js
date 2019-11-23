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
  })
})
