import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import ordersReducer from './reducers/OrdersViewReducer';
import settingsReducer from './reducers/AppSettingsReducer';
// import sagaRoot from './sagas/rootSaga';
import ordersSaga from './sagas/OrdersViewSaga';

const sagaMiddleware = createSagaMiddleware( /* {sagaMonitor} */);

const devTools = window.devToolsExtension ?
    compose(applyMiddleware(sagaMiddleware), window.devToolsExtension())
    : applyMiddleware(sagaMiddleware);

export const store = createStore(
    combineReducers({
        ordersView: ordersReducer,
        settings: settingsReducer
    }),
    devTools
);

export const runSaga = () => {
    sagaMiddleware.run(ordersSaga);
};