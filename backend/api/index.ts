import express from "express"
const router = express.Router();

/* GET api home page. */
router.get('/', function(req, res) {
    res.send({route:"api home"});
});

router.use(function(req, res) {
    return res.status(404).send({ route: req.url+' Not found.' });
});

export default router;