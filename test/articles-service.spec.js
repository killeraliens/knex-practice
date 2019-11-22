const ArticlesService = require('../src/articles-service');
const knex = require('knex')

describe('Articles Service object', () => {
  let db;

  let testArticles = [
    {
      id: 1,
      date_published: new Date('2100-05-22T16:28:32.615Z'),
      title: 'First test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?'
    },
    {
      id: 66,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'Second test post!',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, exercitationem cupiditate dignissimos est perspiciatis, nobis commodi alias saepe atque facilis labore sequi deleniti. Sint, adipisci facere! Velit temporibus debitis rerum.'
    },
    {
      id: 3,
      date_published: new Date('2029-01-22T16:28:32.615Z'),
      title: 'Third test post!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, voluptate? Necessitatibus, reiciendis? Cupiditate totam laborum esse animi ratione ipsa dignissimos laboriosam eos similique cumque. Est nostrum esse porro id quaerat.'
    }
  ]


  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })

  before(() => {
    return db('blogful_articles').truncate()
  })

  afterEach(() => {
    return db('blogful_articles').truncate()
  })

  after(() => { db.destroy() })

  context('given blogful_articles has data', () => {
    beforeEach(() => {
      return db
        .into('blogful_articles')
        .insert(testArticles)
    })

    it('getAllArticles() resolves all articles from blogful_articles table', () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql(testArticles)
        })
    })

    it('getById() resolves an article by id from blogful_articles table', () => {
      return ArticlesService.getById(db, testArticles[1].id)
        .then(actual => {
          expect(actual).to.eql(testArticles[1])
        })
    })

    it('deleteArticle() removes an article from blogful_articles table', () => {
      return ArticlesService.deleteArticle(db, testArticles[1].id)
        .then(() => ArticlesService.getAllArticles(db))
        .then(dbArticles => {
          const expected = testArticles.filter(art => art.id !== testArticles[1].id)
          expect(dbArticles).to.eql(expected)
        })
    })

    it('updateArticle() updates an article from the blogful_articles table', () => {
      const newData = {
        title: 'New Title',
        content: 'New Content',
        date_published: new Date()
      }

      return ArticlesService.updateArticle(db, testArticles[1].id, newData)
        .then(() => {
          return ArticlesService.getById(db, testArticles[1].id)
        })
        .then(actual => {
          expect(actual).to.eql({ ...newData, id: testArticles[1].id})
        })
    })

  })

  context('given that the blogful_articles table has no data', () => {
    it('getAllArticles() resolves an empty array', () => {
      return ArticlesService.getAllArticles(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })

    it('insertArticle() inserts new article and resolves new article with an id', () => {
      const newArticle = {
        title: 'Test new title',
        content: 'Test new content',
        date_published: new Date('2020-01-01T00:00:00.000Z'),
      }

      return ArticlesService.insertArticle(db, newArticle)
        .then(actual => {
          expect(actual).to.eql({
            ...newArticle, id: 1
          })
        })
    })

  })


})
