
describe('Indoaddict Website Tests', () => {
  beforeEach(() => {
    cy.visit('https://indoaddict.com/')
  })

  it('Destination Page Test', () => {
    cy.get('a[href*="destinations"]').click()
    cy.url().should('include', 'destinations')
    cy.get('h1').should('contain', 'Destinations')
  })

  it('Tour Search Test', () => {
    cy.get('input[type="search"]').type('Bali Nusa Penida Tour')
    cy.get('button[type="submit"]').click()
    cy.get('h2').should('contain', 'Search Results')
  })

  it('Tour Details Test', () => {
    cy.get('a[href*="bali-nusa-penida-tour"]').click()
    cy.url().should('include', 'bali-nusa-penida-tour')
    cy.get('h1').should('contain', 'Bali Nusa Penida Tour')
  })

  it('Payment Processing Test', () => {
    cy.get('a[href*="bali-nusa-penida-tour"]').click()
    cy.get('button[type="button"]').contains('Book Now').click()
    cy.get('input[type="text"]').type('Test User')
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="tel"]').type('1234567890')
    cy.get('button[type="submit"]').click()
    cy.get('h2').should('contain', 'Booking Confirmation')
  })

  it('User Account Test', () => {
    cy.get('a[href*="account"]').click()
    cy.get('input[type="text"]').type('Test User')
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.get('h2').should('contain', 'Account Dashboard')
  })
})