/*
*  Scenario: Home page function test
*
*/
context('Actions',() =>{

describe('Launching Homepage', function() {
 it('Home page load successfully', function() {
    cy.viewport(1916, 925)
    cy.visit('http://localhost:3100/')	
	cy.find('Edit Booking')
	cy.find('RESTAURANT')
	});
	
 it('RESTAURANT button can be click',function(){
	 cy.get('.LandingPage_searchContainer__2nx6g > .LandingPage_buttonHolder__1vrue > div > .LandingPage_secondaryButton__BmL0i > .MuiButton-label')
	 .click()
	 //should be on a new URL which includes '/restaurant'
	 cy.url().should('include','/restaurant')
	 cy.contains('Modify')
	 cy.contains('Delete')
	});
    
 it('EditBooking button can be click',function(){
     //click logo, return to home page
	 cy.get('svg > g > g > #b2YzUlQAXz > use').click()
     cy.contains('Edit Booking')
     //click Edit booking button again
	 cy.get('.LandingPage_searchContainer__2nx6g > .LandingPage_buttonHolder__1vrue > div > .LandingPage_primaryButton__2rvTc > .MuiButton-label').click()
	 cy.contains('Confirm')
	 cy.contains('Cancel')
	});
 })

})
