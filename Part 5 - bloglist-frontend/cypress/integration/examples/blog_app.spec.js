const { func } = require("prop-types")


/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title, author, url },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'ahmed omar',
        username: 'ahmedo42',
        password: '11111111'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('login')
    })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.login({ username: 'ahmedo42', password: '11111111' })
            cy.contains('ahmedo42 is logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.login({ username: 'ahmedo42', password: '11111111' })
            cy.contains('Wrong username or password')
        })
      })
      describe.only('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
            username: 'ahmedo42', password: '11111111'
            }).then(response => {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
            })
        })
        it('A blog can be created', function() {
            cy.createBlog({title : 'dummy title' , author : 'dummy author' , url : 'dummy url'})
            cy.contains('dummy title')
        })
        it('A blog can be liked' , function () {
            cy.createBlog({title : 'dummy title' , author : 'dummy author' , url : 'dummy url'})
            cy.contains('dummy title')
            .contains('view')
            .click()
            cy.contains('Like Blog').click()
            cy.contains(`likes: ${1}`)
        })
        it('A blog can be deleted' , function () {
            cy.createBlog({title : 'dummy title' , author : 'dummy author' , url : 'dummy url'})
            cy.contains('dummy title')
            .contains('view')
            .click()
            cy.contains('Delete').click()
            cy.get('dummy title').should('not.exist');

        })
      })
  })