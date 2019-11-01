import {applyMiddleware, createStore} from "redux";
import createSagaMiddleware from 'redux-saga'


import rootReducer from "../reducers/index";


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

[].map(saga => sagaMiddleware.run(saga));


export default store;
