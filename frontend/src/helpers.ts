import {apiUrl} from "../../env";

export function getRandomPageName(): Promise<string> {
    return fetch(`${apiUrl}random`)
        .then(res => res.text());
}

export function sseInit(setCurrentPage: (pagename: any) => void) {
    if (!!window.EventSource) {
        const source = new EventSource(`${apiUrl}event_stream`);

        source.addEventListener('message', function (e) {
             console.log("message", e.data);
            setCurrentPage(e.data);
        }, false);

        source.addEventListener('open', function (e) {
            console.log("Connection was opened")
        }, false);

        source.addEventListener('error', function (e) {
            // @ts-ignore
            if (e.readyState == EventSource.CLOSED) {
                console.log("Connection was closed");
            }
        }, false)
    }
}