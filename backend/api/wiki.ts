import express from "express"
import {getWikiPage} from "./helpers";

const router = express.Router();

/* GET wiki home page. */
router.get('/', (req, res) => {
    res.send({route: "wiki home"});
});

router.get('/:pagename(*)', (req, res) =>
    getWikiPage(encodeURI(req.params.pagename)).then((html: string) => res.send(html))
);

router.use(function (req, res) {
    return res.status(404).send({route: req.url + ' Not found.'});
});

export default router;