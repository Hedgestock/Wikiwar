import fetch from "node-fetch";
import {act} from "react-dom/test-utils";


export function getTitle(url: string): string { //this get everything after the last "/"
    const regex = /\/([^\/]*)$/;
    const res = regex.exec(url);
    return res ? res[1] : "";
}

export function removeBase(html: string): string { //this removes the <base/> tags so the links now fetch on the "man in the middle" server
    let regex = /<base\s*href\s*=\s*[""].*?[""].?>/ig; //moyen moyen
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
        this.res.write(`data: ${decodeURI(this.pagename)}\n\n`)
    }
};

//setTimeout(() => setInterval(()=> {actualName.pagename = new Date().getTime().toString(); actualName.notify();}, 100),4000);

export function getWikiPage(pagename: string): Promise<string> {
    return fetch("https://en.wikipedia.org/api/rest_v1/page/html/" + pagename)
        .then(res => {
            actualName.pagename = getTitle(res.url);//Put the name after redirection into "actualName"
            actualName.notify();// Push the actual page name to the front
            return res.text()
        })
        .then(html => removeBase(html));
}

export function fetchRandomPage(): Promise<string> {
    return fetch("https://en.wikipedia.org/wiki/Special:Random")
        .then(res => decodeURI(getTitle(res.url)));
}