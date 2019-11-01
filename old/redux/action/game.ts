import {IAction} from "../../models/iAction";
import {SET_GOAL_PAGE, SET_START_PAGE} from "./action-types";

export function setStartPage(name:string):IAction {
    return {type: SET_START_PAGE, payload: name};
}

export function setGoalPage(name:string):IAction {
    return {type: SET_GOAL_PAGE, payload: name};
}