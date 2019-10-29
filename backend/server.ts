import  express from 'express';
import  path from 'path';

const app: express.Application = express();

app.use(express.static(path.join(__dirname , './../frontend/static/')));

app.get('/', function(req:any, res:any) {
    res.sendFile(path.join(__dirname + './../frontend/index.html'));
});

app.listen(8080);