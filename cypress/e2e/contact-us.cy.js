describe('Contact Us Page', () => {
    beforeEach(() => {
      cy.visit('https://indoaddict.com/contact-us')
    })
  
  
    it('Should submit the form successfully', () => {
      cy.get('.MuiInputBase-input').eq(0).type('John Doe')
      cy.get('.MuiInputBase-input').eq(1).type('johndoe@example.com')
      cy.get('.MuiInputBase-input').eq(2).type('Test Subject')
      cy.get('form').submit()
      cy.url().should('eq', 'https://indoaddict.com/contact-us')
    })
  
  
    it('Should display error message for empty name field', () => {
      cy.get('.MuiInputBase-input').eq(0).clear()
      cy.get('form').submit()
      cy.get('.MuiInputBase-input').eq(0).should('have.class', 'Mui-error')
    })
  
  
    it('Should display error message for invalid email address', () => {
      cy.get('.MuiInputBase-input').eq(1).type('invalidemail')
      cy.get('form').submit()
      cy.get('.MuiInputBase-input').eq(1).should('have.class', 'Mui-error')
    })
  
  
    it('Should display error message for empty subject field', () => {
      cy.get('.MuiInputBase-input').eq(2).clear()
      cy.get('form').submit()
      cy.get('.MuiInputBase-input').eq(2).should('have.class', 'Mui-error')
    })
  
  
    it('Should navigate to correct page when clicking on navigation links', () => {
      cy.get('.navigation-link').eq(0).click()
      cy.url().should('eq', 'https://indoaddict.com/')
      cy.get('.navigation-link').eq(1).click()
      cy.url().should('eq', 'https://indoaddict.com/destinations')
      // Repeat for all navigation links
    })
  
  
    it('Should navigate to correct page when clicking on social media links', () => {
      cy.get('.social-media-link').eq(0).click()
      cy.url().should('eq', 'https://wa.me/6282228751657')
      cy.get('.social-media-link').eq(1).click()
      cy.url().should('eq', 'https://indoaddict.com/blogs')
      // Repeat for all social media links
    })
  })