context('user adds property with form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('user can submit property', () => {
    cy.get('input[name=property_name]')
      .type('Villa Horrorio')
    cy.get('input[name=price_per_night]')
      .type('140')
    cy.get('input[name=guests]')
      .type('1')
    cy.get('input[name=bedrooms]')
      .type('2')
    cy.get('input[name=beds]')
      .type('3')
    cy.get('input[name=bath]')
      .type('4')
    cy.get('input[name=location]')
      .type('Sardinia')
    cy.get('textarea[name=detailed_description]')
      .type('Cool property in the heart of Sardinia. No dogs allowed.')
    cy.get('input[name=date_available]')
      .type('2018-04-17')
    cy.get('input[name=available_until]')
      .type('2018-04-22')
    cy.get('input[name=email_address]')
      .type('test@email.com')
    cy.get('#add_property-form').submit()
      // .next().should('contain', 'Villa Horrorio', '140', '5 bedrooms', 'Cool property in the heart of Sardinia. No dogs allowed.')
    cy.contains('Villa Horrorio')
  })

})
