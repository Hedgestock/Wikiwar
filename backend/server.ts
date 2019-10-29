import  express = require('express');
import  path = require('path');

const app: express.Application = express();

app.use(express.static(__dirname + './../frontend/static/'));

app.get('/', function(req:any, res:any) {
    res.sendFile(path.join(__dirname + './../frontend/index.html'));
});

app.listen(8080);