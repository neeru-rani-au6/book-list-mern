import React from 'react';
import ReactDom from 'react-dom';
import "./style/style.css";
import App from './app';
import store from './redux/store';
import { Provider } from 'react-redux';
ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));