import express from "express"

import wiki from "./wiki";
import {actualName, fetchRandomPage} from "./helpers";


const router = express.Router();

router.use('/wiki', wiki);

/* GET api home page. */
router.get('/', function(req, res) {
    res.send({route:"api home"});
});

/*GET a random wiki page*/
router.get('/random', function(req, res) {
    fetchRandomPage().then((pagename) => res.send(pagename));
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

router.use(function(req, res) {
    return res.status(404).send({ route: req.url+' Not found.' });
});

export default router;