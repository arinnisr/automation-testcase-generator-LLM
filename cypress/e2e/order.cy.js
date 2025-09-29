describe('Product Page Test Cases', () => {
    it('Navigate to the homepage from the product page', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Home').click();
      cy.url().should('eq', 'https://indoaddict.com/');
    });
  
    it('View product details and related information', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Overview').should('be.visible');
      cy.contains('What\'s Included').should('be.visible');
      cy.get('img').should('have.length.above', 0);
      cy.contains('Related Tour Recommendation').should('be.visible');
    });
  
    it('Access social media platforms', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.get('img[alt="TripAdvisor"]').click();
      cy.url().should('include', 'tripadvisor');
    });
  
    it('Access contact information', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Contact Us').click();
      cy.url().should('eq', 'https://indoaddict.com/contact-us');
    });
  
    it('Initiate the booking process', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Book Now').click();
      cy.url().should('include', '/checkout');
    });
  
    it('View and access related tours', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Related Tour Recommendation').should('be.visible');
      cy.contains('Borobudur Pilgrimage Tour').click();
      cy.url().should('include', '/products/borobudur-pilgrimage-tour');
    });
  
    it('Access customer reviews', () => {
      cy.visit('https://indoaddict.com/products/bali-nusa-penida-tour');
      cy.contains('Read reviews').click();
      cy.url().should('include', 'tripadvisor');
    });
  });