import { combineReducers } from "redux";

import userReducer from "./user";
import configReducer from "./config";
import mintReducer from "./mint";

export default combineReducers({
  config: configReducer,
  userData: userReducer,
  mintData: mintReducer,
});
