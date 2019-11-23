require('dotenv').config();
const knex = require('knex');
const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

const ArticlesService = require('./articles-service');

ArticlesService.getAllArticles(knexInstance)
  .then(allArticles => {
    console.log('ALL THE ARTICLES',allArticles)
  })
  .then(() => {
    const newArticle = {
      title: 'A story about Bronzi',
      content: 'A day in the life.'
    }
    return ArticlesService.insertArticle(knexInstance, newArticle)
  })
  .then(newArticle => {
    console.log('NEW ARTICLE', newArticle)
    const updateContent = { title: 'A Story about RU'}
    return ArticlesService.updateArticle(knexInstance, newArticle.id, updateContent)
      .then(() => ArticlesService.getById(knexInstance, newArticle.id))
  })
  .then(article => {
    console.log('UPDATED ARTICLE', article)
    return ArticlesService.deleteArticle(knexInstance, article.id)
  })





//console.log(ArticlesService.quickQuery(knexInstance));
//ArticlesService.quickQuery(knexInstance);

