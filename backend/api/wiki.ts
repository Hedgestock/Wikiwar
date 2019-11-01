import express from "express"

import {actualName, getTitle, getWikiPage} from "./helpers";

const router = express.Router();

/* GET wiki home page. */
router.get('/', (req, res) => {
    res.send({route: "wiki home"});
});

router.get('/:pagename(*)', (req, res) => {
    getWikiPage(encodeURI(req.params.pagename))
        .then((html: string) => res.send(html))//Send the corrected html to the front
        .catch(e => res.send("ERROR: " + e + "\n(Maybe you should'nt try to reach that now ?)"))
});

router.use(function (req, res) {
    return res.status(404).send({route: req.url + ' Not found.'});
});

export default router;