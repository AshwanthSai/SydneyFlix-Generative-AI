import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import {store} from "./app/store"
import "./index.css"
import ToggleColorMode from './utils/ToggleColorMode';

ReactDOM.render(
    /* Passing theme as Context */
    <Provider store={store}>
        <ToggleColorMode>
            <BrowserRouter>
                <App className = "index"/>
            </BrowserRouter>
        </ToggleColorMode>
    </Provider>,
    document.getElementById('root'),
);