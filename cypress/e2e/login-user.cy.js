describe('User Login', () => {
    beforeEach(() => {
      cy.visit('https://indoaddict.com/login-user')
    })
  
  
    it('can log in with valid credentials', () => {
      cy.get('input[type="text"]').type('username')
      cy.get('input[type="password"]').type('password')
      cy.get('button[type="submit"]').click()
      cy.url().should('eq', 'https://indoaddict.com/')
    })
  
  
    it('can access forgot password page', () => {
      cy.get('a[href*="forgot-password"]').click()
      cy.url().should('contain', 'forgot-password')
    })
  
  
    it('can access homepage from login page', () => {
      cy.get('button[type="button"]').contains('Home').click()
      cy.url().should('eq', 'https://indoaddict.com/')
    })
  })