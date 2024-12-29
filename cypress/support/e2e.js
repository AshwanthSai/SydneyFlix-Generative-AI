import './commands'

// Global configuration and setup here
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})