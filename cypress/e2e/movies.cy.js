describe('Movies Feature', () => {
    beforeEach(() => {
      // Set viewport for consistent testing
      cy.viewport(1280, 720)
      // Remove API intercept for true E2E testing
      cy.visit('/')
    })
  
    it('should display movies on homepage', () => {
      cy.get('[data-testid="movie-grid"]').should('exist')
      cy.get('[data-testid="movie-card"]').should('have.length.greaterThan', 0)
    })
  
    it.only('should navigate to movie details', () => {
      cy.get('[data-testid="movie-card"]').first().click()
      cy.url().should('include', '/movie/')
      cy.get('[data-testid="movie-info"]').should('exist')
    })
  })