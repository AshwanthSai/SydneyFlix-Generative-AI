describe('Movies Feature', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/')
  })

  it('should navigate to category and display featured movie', () => {
    cy.get('a').contains(/popular/i).should('exist').and('be.visible').click()
    cy.get('[data-testid="featuredMovie"]').should('exist')
    cy.get('[id="featuredMovieContent"]').should('exist')
  })

  it('should click and navigate to featured movie details', () => {
    cy.get('a').contains(/popular/i).should('exist').and('be.visible').click()
    cy.get('[data-testid="featuredMovie"]').should('exist').click()
    cy.url().should('include', '/movie/')
    cy.get('button').contains(/back/i).should('exist').click()
    cy.location('pathname').should('eq', '/')
  })

  it('should search and navigate to movie details', () => {
    cy.get('[data-testid="search-input"]').type('SuperMan{enter}')
    cy.get('a').contains('Superman').should('exist').and('be.visible').click()
    cy.get('button').contains(/back/i).should('exist').click({ force: true })
    cy.location('pathname').should('eq', '/')
  })
})