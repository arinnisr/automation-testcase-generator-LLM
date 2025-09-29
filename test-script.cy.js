describe('BINUS UNIVERSITY Homepage Test', () => {
  it('Homepage Navigation', () => {
    cy.visit('https://binus.ac.id/');
    cy.title().should('eq', 'BINUS UNIVERSITY');
    cy.get('header').should('contain', 'BINUS UNIVERSITY');
    cy.get('[href="#"]').click();
    cy.url().should('include', 'program');
  });

  it('Global Recognition Section', () => {
    cy.visit('https://binus.ac.id/');
    cy.get('#global-recognition').should('be.visible');
    cy.get('[href*="Learn More"]').click();
    cy.url().should('include', 'recognition');
  });

  it('News and Events', () => {
    cy.visit('https://binus.ac.id/');
    cy.get('.news-article').should('be.visible');
    cy.get('.news-article a').click();
    cy.url().should('include', 'news');
    cy.go('back');
    cy.get('.event-list').should('be.visible');
  });

  it('Footer Links', () => {
    cy.visit('https://binus.ac.id/');
    cy.get('footer a[href*="mahasiswa"]').click();
    cy.url().should('include', 'mahasiswa');
    cy.go('back');
    cy.get('footer a[href*="calon-mahasiswa"]').click();
    cy.url().should('include', 'calon-mahasiswa');
  });

  it('Image Verification', () => {
    cy.visit('https://binus.ac.id/');
    cy.get('img[alt="BINUS UNIVERSITY"]').should('be.visible');
    cy.get('img[alt="BINUS @Kemanggisan"]').should('be.visible');
  });
});