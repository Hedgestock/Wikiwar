import {IAction} from "../../models/iAction";
import {START_TIMER, STOP_TIMER} from "../action/action-types";

const initialState:
    {
        startTime: number,
        stopTime: number,
        interval: number,
    } = {
    startTime: 0,
    stopTime: 0,
    interval: -1,
};

function timerReducer(state = initialState, action: IAction) {
    if (action.type === START_TIMER) {
        if (state.interval >= 0) {
            clearInterval(state.interval);
        }
        return {...state, startTime: action.payload.time, interval: action.payload.interval};
    } else if (action.type === STOP_TIMER) {
        if (state.interval >= 0) {
            clearInterval(state.interval);
        }
        return {...state, stopTime: action.payload.time, interval: -1};
    }return state;
}

export default timerReducer;
