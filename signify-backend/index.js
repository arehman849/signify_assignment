const express = require('express');
const store = require('./routes/store');

const app = express();
app.all("/store/*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
  });

app.use(express.json());

app.use('/store', store);

app.listen(4000, ()=>console.log('server is listening on port 4000'));