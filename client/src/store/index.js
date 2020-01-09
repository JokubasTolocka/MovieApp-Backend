import rootReducer from './reducers';
import {createStore, applyMiddleware, composeWithDevTools} from 'redux';
import thunk from 'redux-thunk';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : null

export function configureStore(){
    const store = createStore(rootReducer,
        composeWithDevTools(applyMiddleware(thunk),
         devTools));
    return store;
}