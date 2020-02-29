const express = require('express')
const app = express()
const port = 25565;
const pollService = require('./services/pollService.js');

const cors = require('cors');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    });

app.get('/', function (req, res) {
    res.send('Welcome to the Homepage');
})

app.get('/getPoll', function (req, res) {
    res.send(JSON.stringify(pollService.poll));
})

app.post('/setPoll', express.json(), cors(), function (req, res) {
    console.log(req.body);
    pollService.poll = req.body;

    //pollService.poll = req.body
    res.send(JSON.stringify(pollService.poll));
})

app.post('/createPoll', function(req, res) {

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))