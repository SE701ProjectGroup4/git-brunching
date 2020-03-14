
context('Actions', () => {

  describe('Navigate to Nandoz Page', function() {
    it('Home page loaded successful', function() {
      cy.visit('http://192.168.86.34:3000');
      cy.contains('Footer');
    });

    it('Select Nandoz', function() {
        cy.get('#root > div > div > div.LandingPage_tileContainer__1yaPd > div:nth-child(1)')
          .click();
    });

    it('Nandoz Page loaded successful', function() {
      //cy.go('/back').contains('NANDOZ')
      cy.url().should('include', '/booking');
      cy.contains('NANDOZ');
      cy.contains('AT TIME');
      cy.get('#root > div > div > div:nth-child(3) > div:nth-child(3) > button')
        .should('be.visible');
      
    })
  })

  describe('Navigate to KCF Page', function() {
    it('Home page loaded successful', function() {
      cy.visit('http://192.168.86.34:3000');
      cy.contains('Footer');
    });

    it('Select KCF', function() {
        cy.get('#root > div > div > div.LandingPage_tileContainer__1yaPd > div:nth-child(2)')
          .click();
    });

    it('KCF Page loaded successful', function() {
      cy.url().should('include', '/booking');
      cy.contains('KCF');
      cy.contains('AT TIME');
      cy.get('#root > div > div > div:nth-child(3) > div:nth-child(3) > button')
        .should('be.visible');
    })
  })
})
