
describe('Register User Page', () => {

  beforeEach(() => {
    cy.visit('https://indoaddict.com/register-user')
  })

  it('Test register user page URL', () => {
    cy.url().should('eq', 'https://indoaddict.com/register-user')
  })

  it('Test input fields types', () => {
    cy.get('input').each(($el, index, $list) => {
      if (index === 0 || index === 1) {
        expect($el).to.have.attr('type', 'text')
      } else if (index === 2 || index === 3) {
        expect($el).to.have.attr('type', 'password')
      }
    })
  })

  it('Test input fields classes and IDs', () => {
    cy.get('input').each(($el, index, $list) => {
      if (index === 0) {
        expect($el).to.have.class('MuiInputBase-input MuiOutlinedInput-input css-y2ar6i')
        expect($el).to.have.id(':r0:')
      } else if (index === 1) {
        expect($el).to.have.class('MuiInputBase-input MuiOutlinedInput-input css-y2ar6i')
        expect($el).to.have.id(':r1:')
      } else if (index === 2) {
        expect($el).to.have.class('MuiInputBase-input MuiOutlinedInput-input css-y2ar6i')
        expect($el).to.have.id(':r2:')
      } else if (index === 3) {
        expect($el).to.have.class('MuiInputBase-input MuiOutlinedInput-input css-y2ar6i')
        expect($el).to.have.id(':r3:')
      }
    })
  })

  it('Test input fields required fields', () => {
    cy.get('input').each(($el, index, $list) => {
      expect($el).not.to.have.attr('required')
    })
  })

  it('Test input fields labels', () => {
    cy.get('label').should('have.length', 0)
  })

  it('Test form action and method', () => {
    cy.get('form').should('have.attr', 'action', 'https://indoaddict.com/register-user')
    cy.get('form').should('have.attr', 'method', 'get')
  })

  it('Test link URL', () => {
    cy.get('a[href=&quot;https://indoaddict.com/&quot;]').should('have.attr', 'href', 'https://indoaddict.com/')
  })

  it('Test link text', () => {
    cy.get('a').contains('Home').should('be.visible')
  })

  it('Test buttons', () => {
    cy.get('button[type=&quot;button&quot;]').contains('Home').should('be.visible')
    cy.get('input[type=&quot;submit&quot;]').contains('Register').should('be.visible')
  })

  it('Test headings', () => {
    cy.get('h1, h2, h3, h4, h5, h6').should('have.length', 0)
  })

  it('Test images', () => {
    cy.get('img').should('have.length', 0)
  })

})