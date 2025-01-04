import './commands'

// Increase default timeout
Cypress.config('defaultCommandTimeout', 10000)

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

// Handle promise rejections
Cypress.on('uncaught:unhandled:rejection', (err, runnable) => {
  return false
})

// Add retry ability
Cypress.config('retries', {
  runMode: 2,
  openMode: 0
})