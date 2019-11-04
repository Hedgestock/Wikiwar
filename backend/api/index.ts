import express from "express"
import session from "express-session"

import wiki from "./wiki";
import {actualName, fetchRandomPage} from "./helpers";

const router = express.Router();

router.use(session({secret: "wikiwarscrt"}));
router.use('/wiki', wiki);

export let sessionsData = {};
export let serverData = {
    scores: [{
        "startTime": 1572865542174,
        "endTime": 1572865583304,
        "graph": ["Newton_House_Museum", "Historic_house_museum", "International_Council_of_Museums", "Health_Research_Board"],
        startPage: "Newton_House_Museum",
        "goalPage": "Health_Research_Board",
        "ID": "Zokodm_5sD24g-rASGBWzV8SpesKO4ZL",
        username: "test",
    }, {
        startPage: "Sidney_Sussex_College",
        "startTime": 1572865542174,
        "endTime": 1572865583304,
        "graph": ["Sidney_Sussex_College,_Cambridge", "University_of_Cambridge", "Cambridge", "Cambridge,_Massachusetts", "United_States", "1896_in_the_United_States"],
        "goalPage": "1896_in_the_United_States",
        "ID": "Zokodm_5sD24g-rASGBWzV8SpesKO4ZL",
        username: "test2",
    }]
};

// router.get('*', function (req, res, next) {
//     if (req.session!.notFirst) {
//     } else {
//         req.session!.notFirst = true;
//         // @ts-ignore
//         sessionsData[req.sessionID!.toString()] = {
//             startTime: -1,
//             endTime: -1,
//             graph: [],
//             goalPage: null,
//             startPage: null,
//             username: "Anonymous",
//         };
//     }
//
//     next();
// });

/* GET api home page. */
router.get('/', function (req, res) {
    res.send({route: "api home"});
});

/* GET a random wiki page */
router.get('/random', function (req, res) {
    fetchRandomPage().then((pagename) => res.send(pagename));
});

/* Notify the start of a game */
router.get('/start', async function (req, res) {
    console.log(req.query);
    let pages = {startPage: "", goalPage: ""};
    pages.startPage = await fetchRandomPage();
    pages.goalPage = await fetchRandomPage();
    // @ts-ignore
    sessionsData[req.sessionID!.toString()] = {
        startTime: new Date().getTime(),
        endTime: -1,
        graph: [],
        goalPage: pages.goalPage,
        startPage: pages.startPage,
        username: req.query.username ? req.query.username: "Anon",
    };

    res.send(pages);
});

/* GET the leaderboard */
router.get('/scores', function (req, res) {
    res.send(serverData.scores);
});

router.get('/event_stream', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    // @ts-ignore FIXME
    actualName.res = res;
});

router.use(function (req, res) {
    return res.status(404).send({route: req.url + ' Not found.'});
});

export default router;