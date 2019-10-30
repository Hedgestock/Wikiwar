import  express from 'express';
import  path from 'path';

import api from "./api";

const app: express.Application = express();

app.use(express.static(path.join(__dirname , './../frontend/static/')));
app.use('/api', api);

app.get('**/*', function(req:any, res:any) {
    res.sendFile(path.join(__dirname + './../frontend/index.html'));
});


app.listen(8080);