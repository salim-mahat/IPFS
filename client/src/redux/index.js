import { applyMiddleware, createStore } from "redux";

import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers";

const middlewares = applyMiddleware(ReduxThunk, logger);

let store = createStore(rootReducer, middlewares);

export default store;
