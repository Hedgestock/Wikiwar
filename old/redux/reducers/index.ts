import {combineReducers} from "redux";

import timerReducer from "./timerReducer";

//reducers are renamed in a simpler form to clarify usage
const rootReducer = combineReducers({
    timer: timerReducer,
});

export default rootReducer;
