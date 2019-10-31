import {REQUEST_RANDOM_WIKI_PAGE, REQUEST_WIKI_PAGE} from "./action-types";
import {IAction} from "../../models/iAction";

export function requestWikiPage(name: string):IAction {
    return {type: REQUEST_WIKI_PAGE, payload: {name}};
}

export function requestRandomWikiPage():IAction {
    return {type: REQUEST_RANDOM_WIKI_PAGE};
}

