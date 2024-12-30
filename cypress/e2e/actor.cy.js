describe('Actor Information Page', () => {
  // Setup: Configure viewport and navigate to actor page
  beforeEach(() => {
    cy.viewport(1280, 720) // Set consistent viewport size
    cy.visit('/') // Visit home page first to ensure proper state
    cy.visit('/actors/18918') // Navigate to Dwayne Johnson's profile
  })

  // Test 1: Verify actor's basic information display
  it('should display actor details correctly', () => {
    // Check actor name in header
    cy.get('h2')
      .should('contain', 'Dwayne Johnson')
    
    // Verify actor image with proper alt text
    cy.get('img[alt="Dwayne Johnson"]')
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'alt', 'Dwayne Johnson')
    
    // Check birth date information
    cy.get('h5')
      .should('exist')
      .should('contain', 'Born : Tue May 02 1972')
    
    // Verify biography excerpt
    cy.get('p')
      .should('exist')
      .should('contain', 'An American and Canadian actor, producer and semi-retired professional')
  })

  // Test 2: Verify movie recommendations section
  it('should navigate through recommended movies', () => {
    // Check movie list container exists
    cy.get('[data-testid="movieList"]')
      .should('exist')
    
    // Verify pagination controls are present
    cy.get('[data-testid= "pagination"]')
      .should('exist')
  })

  // Test 3: Verify navigation functionality
  it('should handle back navigation', () => {
    // Force click due to potential Alan AI Chatbar overlay
    cy.get('button')
      .contains(/back/i)
      .should('exist')
      .click({ force: true })
    
    // Verify return to homepage
    cy.location('pathname')
      .should('eq', '/')
  })
})