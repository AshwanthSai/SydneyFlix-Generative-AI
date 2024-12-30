describe('Actor Information Page', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/') // Dwayne Johnson's actor ID
      cy.visit('/actors/18918') // Dwayne Johnson's actor ID
    })
  
    it('should display actor details correctly', () => {
      cy.get('h2')
        .should('contain', 'Dwayne Johnson')
      cy.get('img[alt="Dwayne Johnson"]').should('exist').and('be.visible')
        .and('have.attr', 'alt', 'Dwayne Johnson')
      cy.get('h5').should('exist')
        .should('contain', 'Born : Tue May 02 1972')
      cy.get('p').should('exist')
        .should('contain', 'An American and Canadian actor, producer and semi-retired professional')
    })
  
    it('should navigate through recommended movies', () => {
      cy.get('[data-testid="movieList"]')
        .should('exist')
      
      cy.get('[data-testid= "pagination"]')
        .should('exist')
    })
  
    it('should handle back navigation', () => {
        //Alan AI Chatbar at times, hides the Button Element
        cy.get('button').contains(/back/i).should('exist').click({ force: true })
        cy.location('pathname').should('eq', '/')
    })
  })