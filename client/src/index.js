import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // wraps react-router, BrowserRouter includes access to router history
//{ withRouter} includes access to component history from react-router-dom
import "./index.css";
import App from "./App";
import { Provider } from "react-redux"; // makes connect available to components
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducers from './store/reducers/authReducers';
import triviaReducers from './store/reducers/triviaReducers';
import registerServiceWorker from "./registerServiceWorker";

const rootReducer = combineReducers({
    auth: authReducers,
    trivia: triviaReducers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // pattern to include middleware with redux dev tool extension
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
