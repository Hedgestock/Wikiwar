const fetch = require("node-fetch");

// app.js
const express = require("express");

// Create Express app
const app = express();

// serve static files from the `static` folder
app.use(express.static(__dirname + "/static"));

//Set the template engine (I <3 Pug)
app.set("view engine", "pug");

// A sample route
app.get("/", (req, res) => res.render("index.ts"));


app.get("/Wikiwars", (req, res) => Promise.all([fetchRandomPage(), fetchRandomPage()])
    .then(pagesName => { res.render("wikiwars", { urlBase: "https://en.wikipedia.org/wiki/", startPage: decodeURI(pagesName[0]), endPage: decodeURI(pagesName[1]) }) }));

app.get("/wiki/:pagename", (req, res) => getWikiPage(encodeURI(req.params.pagename)).then(html => {
    nameMissmatch.notify();
    return res.send(html)
}).catch(e => res.send("ERROR: " + e + "\n(Maybe you should'nt try to reach that now ?)")));

// Start the Express server
app.listen(3000, () => console.log("Server running on port 3000!"));


let nameMissmatch = {
    res: null,
    pagename: "",
    notify() { this.res.write(`data: ${decodeURI(this.pagename)}\n\n`) }
}

app.get('/event-stream', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    nameMissmatch.res = res;
});


function getWikiPage(pagename) {
    return fetch("https://en.wikipedia.org/api/rest_v1/page/html/" + pagename)
        .then(res => {nameMissmatch.pagename = getTitle(res.url); return res.text()})
        .then(html => removeBase(html));
}

function removeBase(html) {
    let regex = /<base\s*href\s*=\s*[""].*?[""].?>/ig; //moyen moyen
    let link;

    while ((link = regex.exec(html)) !== null) {
        html = html.replace(link[0], "");
    }
    return html;
}

function fetchRandomPage() {
    return fetch("https://en.wikipedia.org/wiki/Special:Random")
        .then(res => getTitle(res.url));
}

function getTitle(url) {
    let regex = /\/([^\/]*)$/;
    return regex.exec(url)[1];
}