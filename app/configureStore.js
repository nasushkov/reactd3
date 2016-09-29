import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import initSaga from './sagas/initSaga'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState){
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(loggerMiddleware, sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

    sagaMiddleware.run(initSaga)

    if(module.hot){
        module.hot.accept('./reducers/rootReducer', () => {
            const nextReducer = require('./reducers/rootReducer').default
            store.replaceReducer(nextReducer)
        })
    }
    return store
}