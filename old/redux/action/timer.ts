import {IAction} from "../../models/iAction";
import {START_TIMER, STOP_TIMER} from "./action-types";

export function startTimer(time: number, interval: number):IAction {
    return {type: START_TIMER, payload: {time, interval}};
}

export function stopTimer(time: number):IAction {
    return {type: STOP_TIMER, payload: {time}};
}