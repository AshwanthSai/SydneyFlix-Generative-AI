describe('Movies Feature', () => {
    beforeEach(() => {
      cy.viewport(1280, 720)
      cy.visit('/')
    })
  
    it('Login with a Test Account and Check Favoriting or Watchlisting Movies', () => {
      cy.get('[data-testid="profile-avatar"]').should('exist').and('be.visible').click()
          cy.origin('https://www.themoviedb.org', () => {
              // Sometimes the website loads a bit late and the test fails, so increasing max timeout
              // Occasionally, we put the Cypress Thread to sleep for 1 second
              // Else will flag, Cloudflare on backend
              cy.wait(1000)
              cy.get('h2', { timeout: 6000 }).contains(/login/i).should('exist').and('be.visible').click()
              cy.wait(1000)
              cy.get(`[id="username"]`,  { timeout: 6000 }).type(Cypress.env().tmdbTestEmail)
              cy.get(`[id="password"]`, { timeout: 6000 }).type(Cypress.env().tmdbTestPassword)
              cy.wait(1000)
              cy.get(`[id="login_button"]`, { timeout: 6000 }).click()
              cy.wait(1000)
              cy.get(`button`, { timeout: 6000 }).contains(/approve/i).click()
          })
      cy.location('pathname').should('eq', '/')
        /* cy.get("a").contains(/My Movies/i).should('exist')
        // Favoriting Movies
        let featuredMovieName;
        cy.get('[id="featuredMovieContent"]', { timeout: 6000 })
        .invoke('text')
        .then((text) => {
            featuredMovieName = text;
        }); */
        cy.get('[data-testid="search-input"]').type('SuperMan{enter}')
        cy.get('a').contains('Superman').should('exist').and('be.visible').click()
        // cy.task('log', featuredMovieName)
        // cy.get('[data-testid="featuredMovie"]', { timeout: 6000 }).should('exist').click()
        cy.url().should('include', '/movie/')
        cy.get('[id="FavoriteOrUnFavoriteButton"]').should('exist').and('be.visible').click()
        cy.get('[id="WatchListOrUnWatchlistButton"]').should('exist').and('be.visible').click()   
        cy.get('[data-testid="profileButton"]').should('exist').and('be.visible').click()   
        // Featured movie should be in both favorite and watchlist
        cy.get("h5").contains(`/Superman/i`).should('have.length', 2)
        cy.get('a').contains('Superman').should('exist').and('be.visible').click()
        cy.get('[id="WatchListOrUnWatchlistButton"]').should('exist').and('be.visible').click()   
        cy.get('[data-testid="profileButton"]').should('exist').and('be.visible').click() 
        cy.get('[data-testid="profileButton"]').should('exist').and('be.visible').click()     
        cy.get('button').contains(`/logout/i`).click()
        cy.location('pathname').should('eq', '/')
    })

})