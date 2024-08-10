import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {
    BrowserRouter 
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';

/* Creating our own theme */
const theme = createTheme({})

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    /* Passing theme as Context */
    <ThemeProvider theme = {theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>
,document.getElementById('root'),
);