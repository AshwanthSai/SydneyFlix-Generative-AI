describe('Movies Feature', () => {
  // Setup: Configure viewport and initial page load
  beforeEach(() => {
    cy.viewport(1280, 720) // Set consistent viewport size
    cy.visit('/') // Start from homepage for each test
  })

  // Test 1: Category Navigation and Featured Movie Display
  it('should navigate to category and display featured movie', () => {
    // Click popular movies category
    cy.get('a').contains(/popular/i).should('exist').and('be.visible').click()
    // Verify featured movie section exists
    cy.get('[data-testid="featuredMovie"]').should('exist')
    // Check featured movie content is loaded
    cy.get('[id="featuredMovieContent"]').should('exist')
  })

  // Test 2: Movie Details Navigation and Back Button
  it('should click and navigate to featured movie details', () => {
    // Navigate to popular movies
    cy.get('a').contains(/popular/i).should('exist').and('be.visible').click()
    // Click featured movie
    cy.get('[data-testid="featuredMovie"]').should('exist').click()
    // Verify URL includes movie path
    cy.url().should('include', '/movie/')
    // Test back navigation
    cy.get('button').contains(/back/i).should('exist').click()
    // Verify return to homepage
    cy.location('pathname').should('eq', '/')
  })

  // Test 3: Search Functionality and Navigation
  it('should search and navigate to movie details', () => {
    // Enter search term and submit
    cy.wait(2000)
    cy.get('[data-testid="search-input"]').type('SuperMan{enter}')
    // Click search result
    cy.wait(2000)
    cy.get('a').contains('Superman').should('exist').and('be.visible').click()
    // Force click back button (handles Alan AI Chatbar overlay)
    cy.get('button').contains(/back/i).should('exist').click({ force: true })
    // Verify return to homepage
    cy.location('pathname').should('eq', '/')
  })
})