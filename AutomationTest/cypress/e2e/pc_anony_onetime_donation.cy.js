//This test navigates to the QA Giving site and submits an anonymous one time donation
describe('Donation', () => {
    it('passes', () => {
        cy.visit('https://qa-interview-test-org-467719.churchcenter.com/giving')
        cy.get('#356676_input').type('52')
        cy.get('#356676_input').should('have.value', '52')
        cy.get('#email_address').type('test.automation@email.com')
        cy.get('#email_address').should('have.value', 'test.automation@email.com')
        cy.get('#first_name').type('Test')
        cy.get('#first_name').should('have.value', 'Test')
        cy.get('#last_name').type('Automation')
        cy.get('#last_name').should('have.value', 'Automation')
        cy.get('.ladda-label').should('have.text', 'Continue')
        cy.get('.ladda-button').click();
        cy.get('.__PrivateStripeElement > iframe').click()
        cy.wait(1000)
        cy.get('iframe').then($iframe => {
            const doc = $iframe.contents()
            let input = doc.find('input')[0]
            cy.wrap(input)
                .type('4242')
                .type('4242')
                .type('4242')
                .type('4242')
            input = doc.find('input')[1]
            cy.wrap(input)
                .type('12')
                .type('29')
            input = doc.find('input')[2]
            cy.wrap(input)
                .type('124')
            input = doc.find('input')[3]
            cy.wrap(input)
                .type('33611')
        })
        cy.get('.ladda-label').should('have.text', 'Give $52 now')
        cy.get('#covering_fee').check({
            force: true
        })
        cy.get('.ladda-label').should('have.text', 'Give $53.45 now')
        cy.get('.ladda-button').click()
        cy.wait(6000)
        cy.get('.pl-1').should('have.text', 'Thank you!')
    })
})