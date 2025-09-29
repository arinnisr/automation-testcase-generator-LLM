describe('Registration Page', () => {
  beforeEach(() => {
    cy.visit('https://indoaddict.com/register-user')
  })


  it('access registration page', () => {
    cy.url().should('eq', 'https://indoaddict.com/register-user')
    cy.get('form').should('be.visible')
  })


  it('view registration form', () => {
    cy.get('input[type="text"]').should('have.length', 2)
    cy.get('input[type="password"]').should('have.length', 2)
  })


  it('submit registration form', () => {
    cy.get('input[type="text"]').eq(0).type('username')
    cy.get('input[type="text"]').eq(1).type('email')
    cy.get('input[type="password"]').eq(0).type('password')
    cy.get('input[type="password"]').eq(1).type('password')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', 'https://indoaddict.com/')
  })


  it('navigate to home page', () => {
    cy.get('a[href="/"]').click()
    cy.url().should('eq', 'https://indoaddict.com/')
  })
})