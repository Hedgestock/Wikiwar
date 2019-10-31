import fetch from "node-fetch";


export function getTitle(url: string): string {
    const regex = /\/([^\/]*)$/;
    const res = regex.exec(url);
    return res ? res[1] : "";
}

export function removeBase(html: string): string {
    let regex = /<base\s*href\s*=\s*[""].*?[""].?>/ig; //moyen moyen
    let link;

    while ((link = regex.exec(html)) !== null) {
        html = html.replace(link[0], "");
    }
    return html;
}

export function getWikiPage(pagename:string ) {
    return fetch("https://en.wikipedia.org/api/rest_v1/page/html/" + pagename)
        .then(res => res.text())
        .then(html => removeBase(html));
}