import fetch from "node-fetch";
import {act} from "react-dom/test-utils";
import {wikipediaRestHtmlUrl, wikipediaUrl} from "../../env";


export function getTitle(url: string): string { //this get everything after the last "/"
    const regex = /\/([^\/]*)$/;
    const res = regex.exec(url);
    return res ? res[1] : "";
}

const noCache = "<meta http-equiv=\"cache-control\" content=\"max-age=0\" /><meta http-equiv=\"cache-control\" content=\"no-cache\" /><meta http-equiv=\"expires\" content=\"0\" /><meta http-equiv=\"expires\" content=\"Tue, 01 Jan 1980 1:00:00 GMT\" /><meta http-equiv=\"pragma\" content=\"no-cache\" />";
function disableCaching(html: string): string {
    const regex = /<\s*head\s*.*?>/ig;
    const head = regex.exec(html);
    html = html.replace(head![0], head![0] + noCache);
    return html;
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

export function getWikiPage(pagename: string): Promise<string> {
    return fetch(`${wikipediaRestHtmlUrl}${pagename}`)
        .then(res => {
            actualName.pagename = getTitle(res.url);//Put the name after redirection into "actualName"
            actualName.notify();// Push the actual page name to the front
            return res.text()
        })
        .then(html => removeBase(html));
}

export function fetchRandomPage(): Promise<string> {
    return fetch(`${wikipediaUrl}Special:Random`)
        .then(res => decodeURIComponent(getTitle(res.url)));
}