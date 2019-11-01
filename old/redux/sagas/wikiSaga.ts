import {call, take, select, put} from "redux-saga/effects";
import {REQUEST_WIKI_PAGE} from "../action/action-types";

export function* wikiSaga(): IterableIterator<void> {
        // @ts-ignore TODO: look how to be TS compliant with that
        const action: IAction = yield take(REQUEST_WIKI_PAGE);
}
