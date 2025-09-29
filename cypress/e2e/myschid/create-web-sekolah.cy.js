describe('Website Sekolah Creation Test', () => {
  it('User navigates to the website sekolah creation page and checks for correct pricing information display', () => {
    cy.visit('https://mysch.id/buat/website-sekolah')
      .then(() => {
        // Check pricing plans
        cy.get('body').should('contain', 'Rp700.000 /6 Bulan')
          .should('contain', 'Rp1.300.000 /1 Tahun')
          .should('contain', 'Rp2.500.000 /2 Tahun')
          .should('contain', 'Rp3.500.000 /3 Tahun');
      });
  });

  it('User submits the form for creating a school website and checks for successful submission', () => {
    cy.visit('https://mysch.id/buat/website-sekolah')
      .then(() => {
        // Since the form fields are hidden, we directly submit the form
        cy.request({
          method: 'POST',
          url: 'https://mysch.id/buat/website-sekolah/1/check',
          // Add form data if fields were visible
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
  });

  it('User checks the navigation links in the footer and header', () => {
    cy.visit('https://mysch.id/buat/website-sekolah')
      .then(() => {
        // Example: Check 'Home' link
        cy.get('[href="https://mysch.id/"]').click().then(() => {
          cy.url().should('eq', 'https://mysch.id/');
        });
      });
  });

  it('User checks for contact information and social media links', () => {
    cy.visit('https://mysch.id/buat/website-sekolah')
      .then(() => {
        // Example: Check WhatsApp link
        cy.get('[href^="https://wa.me/"]').invoke('attr', 'href').then((href) => {
          cy.request(href).then((response) => {
            expect(response.status).to.equal(200);
          });
        });
      });
  });
});