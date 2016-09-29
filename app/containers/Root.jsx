import React, { Component } from 'react';
import { Provider } from 'react-redux'
import Immutable from 'seamless-immutable';
import configureStore from '../configureStore'
import App from './app'

const store = configureStore(Immutable.from({
    loading: true,
    rawData: [],
    filter: {
        year: '*',
        state: '*'
    }
}))


export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);