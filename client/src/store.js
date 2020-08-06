import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

/* 
1. createStore: create store to maintian states
2. applyMiddleware: enable us to use middleware, thunk in our case
3. thunk: a middleware that allows us to make async action in redux
4. compseWithDevTools: connects the app to Redux Dev Tools
5. Provider: enable nested component in React access store
*/

const initialState = {};

const middleware = [thunk];

const store = createStore(
	rootReducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
