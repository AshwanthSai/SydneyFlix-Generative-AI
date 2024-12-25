import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../app/store'
import ToggleColorMode from './ToggleColorMode'

/* 
    Just like in a real app, any Redux-connected components will need 
    a React-Redux <Provider> component wrapped around them, with a real
    Redux store set up and provided. Additionally, the test code should 
    create a separate Redux store instance for every test, rather than 
    reusing the same store instance and resetting its state. That ensures
    no values accidentally leak between tests.

    Instead of copy-pasting the same store creation and Provider setup in every test,
    we can use the wrapper option in the render function and export our own customized 
    renderWithProviders function that creates a new Redux store and renders a <Provider>,
    as explained in React Testing Library's setup docs.
*/

export function renderWithProviders(ui, extendedRenderOptions = {}) {
  const {
    // Automatically create a store instance, If no store was passed in
    preloadedState = {}, 
    // If you are not modifying, then you are creating the store,
    // similar to your original store
    store = setupStore(preloadedState), // Calling the setupStore function which returns a custom store;
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }) => (
    <Provider store={store}>
        <ToggleColorMode>
            {children}
        </ToggleColorMode>
    </Provider>
  )

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}