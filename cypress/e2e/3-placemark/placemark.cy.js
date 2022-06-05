

describe('example placemark app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('127.0.0.1:3000/login')
  })

  describe('My First Test', function(){
    it('Make an assertion', function(){
      cy.visit('127.0.0.1:3000/signup')

      cy.url()
          .should('include', '/signup')
    })
  })
  describe('My Second Test Sign up', function(){
  it('Make an assertion', function(){
    cy.visit('127.0.0.1:3000/signup')

    cy.get('input[name ="firstName"]').type('marge')
    cy.get('input[name ="lastName"]').type('Simpson')
    cy.get('input[name ="email"]').type('marge@simpson.com')
    cy.get('input[name ="password"]').type('secret')
    cy.get('#signup').click({force: true})
  })
  })

    describe('My Third Test Log in', function(){
    it('Make an assertion', function(){
      cy.visit('127.0.0.1:3000/login')

      cy.get('input[name ="email"]').type('marge@simpson.com')
      cy.get('input[name ="password"]').type('secret')
      cy.get('#login').click({force: true})

      cy.location('pathname').should('eq', '/login', 'redirect', '/dashboard' )
  })
})


})
