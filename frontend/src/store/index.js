// export { default as configureStore } from './configureStore';

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './modules'

const initialState = {}
const enhancers = []
const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  createRootReducer(),
  initialState,
  composedEnhancers
);
