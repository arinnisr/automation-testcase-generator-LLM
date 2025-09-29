describe("Product Details Page", () => {
    beforeEach(() => {
      cy.visit("https://indoaddict.com/products/bali-nusa-penida-tour")
    })
  
  
    it("can navigate to homepage", () => {
      cy.get("[href='https://indoaddict.com/']").click()
      cy.url().should("eq", "https://indoaddict.com/")
    })
  
  
    it("can select a product and view its details", () => {
      cy.get(".product-image").click()
      cy.url().should("contain", "/products/")
    })
  
  
    it("can select a date and number of travelers for a tour", () => {
      cy.get("[data-testid='select-date-and-travelers']").click()
      cy.url().should("contain", "/date-and-travelers")
    })
  
  
    it("can view the tour overview and itinerary", () => {
      cy.get("[data-testid='overview-tab']").click()
      cy.get(".overview-content").should("be.visible")
    })
  
  
    it("can view the meeting and pickup points for the tour", () => {
      cy.get("[data-testid='meeting-and-pickup-tab']").click()
      cy.get(".meeting-and-pickup-content").should("be.visible")
    })
  
  
    it("can view what to expect on the tour", () => {
      cy.get("[data-testid='what-to-expect-tab']").click()
      cy.get(".what-to-expect-content").should("be.visible")
    })
  
  
    it("can view reviews and FAQs about the tour", () => {
      cy.get("[data-testid='reviews-tab']").click()
      cy.get(".reviews-content").should("be.visible")
      cy.get("[data-testid='faqs-tab']").click()
      cy.get(".faqs-content").should("be.visible")
    })
  })