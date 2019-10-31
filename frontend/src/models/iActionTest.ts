import {IAction} from "./iAction";

export interface IActionTest extends IAction{
    payload: {test:string},
}