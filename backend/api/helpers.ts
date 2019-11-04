import fetch from "node-fetch";
import {apiUrl, wikipediaRestHtmlUrl, wikipediaUrl} from "../../env";
import {serverData, sessionsData} from "./index";


export function createGraph(array: string[]) {
    if (!array.length) {
        return null;
    }
    let graph = "digraph res {";
    graph += `"${array[0]}" [shape=cds];`;
    graph += `"${array[array.length - 1]}" [shape=rectangle];`;

    for (let i = 0; i < array.length - 1; i++) {
        graph += `"${array[i]}" -> "${array[i+1]}";`;

    }
    graph += "}";
    return graph;
}

export function getTitle(url: string): string { //this get everything after the last "/"
    const regex = /\/([^\/]*)$/;
    const res = regex.exec(url);
    return res ? res[1] : "";
}

function removeBase(html: string): string { //this removes the <base/> tags so the links now fetch on the "man in the middle" server
    const regex = /<\s*base\s*href\s*=\s*.*?>/ig; //moyen moyen
    let link;

    while ((link = regex.exec(html)) !== null) {
        html = html.replace(link[0], "");
    }
    return html;
}

export let actualName = {
    res: null,
    pagename: "",
    notify() {
        // @ts-ignore FIXME
        this.res.write(`data: ${decodeURIComponent(this.pagename)}\n\n`)
    }
};

export function getWikiPage(pagename: string, sessionID: string): Promise<string> {
    return fetch(`${wikipediaRestHtmlUrl}${pagename}`)
        .then(res => {
            const pagename = getTitle(res.url);
            // @ts-ignore FIXME
            sessionsData[sessionID].graph.push(pagename);
            // @ts-ignore FIXME
            if (sessionsData[sessionID].goalPage === pagename) { //check win condition
                // @ts-ignore FIXME
                sessionsData[sessionID].endTime = new Date().getTime();
                // @ts-ignore FIXME
                serverData.scores.push({...sessionsData[sessionID], ID : sessionID});
            }
            actualName.pagename = pagename;//Put the name after redirection into "actualName"
            actualName.notify();// Push the actual page name to the front
            return res.text()
        })
        .then(html => removeBase(html));
}

export function fetchRandomPage(): Promise<string> {
    return fetch(`${wikipediaUrl}Special:Random`)
        .then(res => decodeURIComponent(getTitle(res.url)));
}