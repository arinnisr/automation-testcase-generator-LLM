describe('Indoaddict Website', () => {
  beforeEach(() => {
    cy.visit('https://indoaddict.com/')
  })


  it('Book a Bali Nusa Penida Tour', () => {
    cy.get('[href*="bali-nusa-penida-tour"]').click()
    cy.get('[data-testid="date-picker"]').click()
    cy.get('[data-testid="travelers-picker"]').click()
    cy.get('[data-testid="book-now-button"]').click()
    cy.url().should('include', '/payment')
  })


  it('View Tour Details', () => {
    cy.get('[href*="bali-nusa-penida-tour"]').click()
    cy.get('[data-testid="tour-overview"]').should('be.visible')
    cy.get('[data-testid="whats-included"]').should('be.visible')
    cy.get('[data-testid="meeting-pickup-points"]').should('be.visible')
    cy.get('[data-testid="cancellation-policy"]').should('be.visible')
  })


  it('Navigate to Related Tours', () => {
    cy.get('[href*="bali-nusa-penida-tour"]').click()
    cy.get('[data-testid="related-tour-recommendation"]').click()
    cy.url().should('include', '/related-tours')
  })


  it('Contact Indoaddict', () => {
    cy.get('[href*="contact-us"]').click()
    cy.get('[data-testid="contact-form"]').should('be.visible')
    cy.get('[data-testid="name-input"]').type('John Doe')
    cy.get('[data-testid="email-input"]').type('johndoe@example.com')
    cy.get('[data-testid="message-input"]').type('Hello, I need support.')
    cy.get('[data-testid="submit-button"]').click()
    cy.url().should('include', '/thank-you')
  })
})