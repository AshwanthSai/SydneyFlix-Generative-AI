import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { App } from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./app/store";
import "./index.css";
import ToggleColorMode from './utils/ToggleColorMode';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(rootElement);

// Render the application
root.render(
    /* Passing theme as Context */
    <Provider store={store}>
        <ToggleColorMode>
          {/* 
             Sets base URL path for all routes
             
           */}
            <BrowserRouter basename="/sydneyflix">
                <App className="index" />
            </BrowserRouter>
        </ToggleColorMode>
    </Provider>
);