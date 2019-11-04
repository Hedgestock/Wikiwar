import {apiUrl} from "../../env";
import * as React from "react";

export function getRandomPageName(): Promise<string> {
    return fetch(`${apiUrl}random`)
        .then(res => res.text());
}

export function remoteStart(username: string): Promise<string> {
    return fetch(`${apiUrl}start?username=${encodeURIComponent(username)}`) //FIXME Check for injection instead of encoding
        .then(res => res.text());
}

export function sseInit(setCurrentPage: (pagename: any) => void) {
    if (!!window.EventSource) {
        const source = new EventSource(`${apiUrl}event_stream`);

        source.addEventListener('message', function (e) {
            console.log(e.data);
            setCurrentPage(e.data);
        }, false);

        source.addEventListener('open', function (e) {
            console.log("Connection was opened");
        }, false);

        source.addEventListener('error', function (e) {
            // @ts-ignore FIXME
            if (e.readyState == EventSource.CLOSED) {
                console.log("Connection was closed");
            }
        }, false)
    }
}

export async function getScores(setter: (e: any) => void) {
    return await fetch(`${apiUrl}scores`)
        .then(res => res.json())
        .then(json => setter(json));
}

export const formatTimer = (time: number, full = false): string => {
    let s = Math.floor(time / 1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);

    return (full ?
            `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}:${(time % 1000)}`
            :
            `${`0${(h % 60)}`.slice(-2)}:${`0${(m % 60)}`.slice(-2)}:${`0${(s % 60)}`.slice(-2)}`
    );
};