import express from "express"

import {getWikiPage} from "./helpers";

const router = express.Router();


router.get('/', (req, res, next) => {
    res.header( "User-Agent","arthur.pamart@epita.fr");
    next();
});

/* GET wiki home page. */
router.get('/', (req, res) => {
    res.send({route: "wiki home"});
});

router.get('/:pagename(*)', (req, res) => {
    getWikiPage(encodeURIComponent(req.params.pagename), req.sessionID!)
        .then((html: string) => {
            res.header("Cache-Control", "no-cache, no-store");
            res.header("Pragma", "no-cache");
            res.header("Expires", "-1");
            res.send(html);
        })//Send the corrected html to the front
        .catch(e => res.send("ERROR: " + e + "\n(Maybe you should'nt try to reach that now ?)"))
});

router.use(function (req, res) {
    return res.status(404).send({route: req.url + ' Not found.'});
});

export default router;