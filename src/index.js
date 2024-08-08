import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import {
    BrowserRouter 
} from "react-router-dom";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
,document.getElementById('root'),
);