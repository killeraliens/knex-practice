require('dotenv').config()
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})


function searchByProductName(term) {
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where('name', 'ilike', `%${term}%`)
    .then(res => {
      console.log(res)
    })
}

function productsWithImages() {
  knexInstance
    .select('product_id', 'name', 'price', 'category', 'image')
    .from('amazong_products')
    .whereNull('image')
    .then(res => {
      console.log(res)
    })
}

function productsByPageLimit10(page) {
  const productsPerPage = 10;
  const offset = productsPerPage * (page - 1)
  knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .limit(productsPerPage)
    .offset(offset)
    .then(res => {
      console.log(res)
    })
}

//You need to build a query that allows customers to
//see the most popular videos by view at Whopipe
//by region
//for the last 30 days.

// SELECT video_name, region, count(date_viewed) AS views
// FROM whopipe_video_views
// WHERE date_viewed > (now() - '30 days':: INTERVAL)
// GROUP BY video_name, region
// ORDER BY region ASC, views DESC;

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', 'region')
    .count('date_viewed AS views')
    .from('whopipe_video_views')
    .where(
      'date_viewed',
      '>',
      knexInstance.raw(`now() - '?? days':: interval`, days)
    )
    .groupBy('video_name', 'region')
    .orderBy([
      { column: 'views', order: 'DESC'},
      { column: 'region', order: 'ASC' }
    ])
    .then(res => {
      console.log(res)
    })
}

//searchByProductName('holo')
//productsByPageLimit10(1)
// productsWithImages()
mostPopularVideosForDays(30)
