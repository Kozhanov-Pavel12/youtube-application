import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;


const store = createStore(
  rootReducer, 
  composeEnhancers(applyMiddleware(thunk))
)


ReactDOM.render(
  <React.StrictMode>

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);