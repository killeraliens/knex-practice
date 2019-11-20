require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});


function returnSearchItems(term) {
  knexInstance
  .select('*')
  .from('shopping_list')
  .where('name', 'ilike', `%${term}%`)
  .then(res => {
    console.log(res)
  });
}

function itemsByPage(page) {
  const limit = 6;
  const offset = limit * (page - 1);
  knexInstance
  .select('*')
  .from('shopping_list')
  .limit(limit)
  .offset(offset)
  .then(res => {
    console.log(res)
  })

}

function itemsAfterDate(daysAgo) {
  knexInstance
  .select('*')
  .from('shopping_list')
  .where(
    'date_added',
    '>',
    knexInstance.raw(`now() - '?? days' :: interval`, daysAgo)
  )
  .then(res => {
    console.log(res)
  })
}

function returnTableLength(table) {
  knexInstance
    .select('*')
    .from(table)
    .then(res => {
      console.log(res.length)
    })
}

function getTotalCostForEachCategory() {
  knexInstance
    .select('category')
    .sum('price as sum')
    .from('shopping_list')
    .groupBy('category')
    .orderBy([
      { column: 'sum', order: 'desc' }
    ])
    .then(res => {
      console.log(res)
    })
}
//returnSearchItems('al');
//itemsByPage(6)
//returnLength('shopping_list');
//itemsAfterDate(3);
getTotalCostForEachCategory();
