import express from "express"

import wiki from "./wiki";


const router = express.Router();

router.use('/wiki', wiki);

/* GET api home page. */
router.get('/', function(req, res) {
    res.send({route:"api home"});
});

router.use(function(req, res) {
    return res.status(404).send({ route: req.url+' Not found.' });
});

export default router;