describe('Task Manager App', () => {
  it('should load the login page successfully', () => {
    cy.visit('https://wonderful-forest-08f165403.6.azurestaticapps.net/');
    
    cy.contains('Welcome').should('be.visible');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button').contains('Login').should('exist');
  });
});
