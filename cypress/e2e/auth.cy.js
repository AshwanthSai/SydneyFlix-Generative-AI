describe('Movies Feature', () => {
    // Set up viewport and initial page load
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/')
    })
  
    it('Login with a Test Account and Check Favoriting or Watchlisting Movies', () => {
      // Step 1: Initial Navigation to Login
      cy.get('[data-testid="profile-avatar"]').should('exist').and('be.visible').click()

      // Step 2: TMDB Authentication Flow
      cy.origin('https://www.themoviedb.org', () => {
          // Adding delays to handle Cloudflare protection
          cy.wait(1000)
          // Login form interaction with extended timeout
          cy.get('h2', { timeout: 6000 }).contains(/login/i).should('exist').and('be.visible').click()
          cy.wait(1000)
          // Enter credentials from environment variables
          cy.get(`[id="username"]`,  { timeout: 6000 }).type(Cypress.env().tmdbTestEmail)
          cy.get(`[id="password"]`, { timeout: 6000 }).type(Cypress.env().tmdbTestPassword)
          cy.wait(3000)
          // Submit login and approve access
          cy.get(`[datatest-id="logout-button"]`, { timeout: 6000 }).click()
          cy.wait(1000)
          cy.get(`button`, { timeout: 6000 }).contains(/approve/i).click()
      })

      // Step 3: Verify successful login redirect
      cy.location('pathname').should('eq', '/')

      // Step 4: Search and Navigate to Movie
      cy.get('[data-testid="search-input"]').type('SuperMan{enter}')
      cy.wait(1000) // Wait for search results
      cy.get('a').contains('Superman').should('exist').and('be.visible').click()
      
      // Step 5: Verify movie page and interact with favorite/watchlist
      cy.url().should('include', '/movie/')
      cy.wait(1000)
      // Force click used due to potential overlay elements
      cy.get('[id="FavoriteOrUnFavoriteButton"]').should('exist').click({ force: true })
      cy.get('[id="WatchListOrUnWatchlistButton"]').should('exist').click({ force: true })
      cy.wait(3000) // Wait for API response

      // Step 6: Verify movie appears in profile lists
      cy.get('[data-testid="profileButton"]').should('exist').and('be.visible').click()   
      cy.wait(1000)
      cy.get(`[id="superman"]`).should('have.length', 2) // Check both favorites and watchlist

      // Step 7: Remove movie from lists
      cy.get('a').contains('Superman').should('exist').and('be.visible').click()
      cy.wait(1000)
      cy.get('[id="FavoriteOrUnFavoriteButton"]').should('exist').click({ force: true })
      cy.get('[id="WatchListOrUnWatchlistButton"]').should('exist').click({ force: true })  

      // Step 8: Logout and verify
      cy.wait(1000) 
      cy.get('[data-testid="profileButton"]').should('exist').click() 
      cy.wait(3000)
      cy.get('[datatest-id="logout-button"]').click()
      cy.location('pathname').should('eq', '/')
    })
})