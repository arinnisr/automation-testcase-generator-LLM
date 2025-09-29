describe('Login Page Tests', () => {
    beforeEach(() => {
      cy.visit('https://indoaddict.com/login-user');
    });
  
    it('Loads the login page successfully', () => {
      cy.url().should('include', 'login-user');
      cy.get('input[type="text"]').should('exist');
      cy.get('input[type="password"]').should('exist');
      cy.contains('Forgot Your Password?').should('exist');
      cy.contains('Login').should('exist');
    });
  
    it('Allows users to enter email and password', () => {
      cy.get('input[type="text"]').type('test@test.com');
      cy.get('input[type="password"]').type('12345678');
    });
  
    it('Submits the login form successfully', () => {
      cy.get('input[type="text"]').type('test@test.com');
      cy.get('input[type="password"]').type('12345678');
      cy.contains('Login').click();
      cy.url().should('include', '/');
    });
  
    it('Navigates to the forgot password page', () => {
      cy.contains('Forgot Your Password?').click();
      cy.url().should('include', 'forgot-password');
    });
  
    it('Navigates back to the home page', () => {
      cy.contains('Home').click();
      cy.url().should('include', '/');
    });
  });