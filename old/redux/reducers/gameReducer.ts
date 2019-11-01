import {IAction} from "../../models/iAction";
import {GameState} from "../../models/gameState";
import {SET_GOAL_PAGE, SET_START_PAGE} from "../action/action-types";

const initialState:
    {
        gameState: GameState,
        startPage: string,
        goalPage: string,
    } = {
    gameState: GameState.waiting,
    startPage: null,
    goalPage: null,
};

function gameReducer(state = initialState, action: IAction) {
    if (action.type === SET_START_PAGE) {
        return {...state, startPage: action.payload}
    } else if (action.type === SET_GOAL_PAGE) {
        return {...state, goalPage: action.payload}
    }
    return state;
}

export default gameReducer;
