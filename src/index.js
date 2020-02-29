const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
const pollService = require('./services/pollService.js');

app.use(express.json())

app.get('/', function (req, res) {
    res.send('Welcome to the Homepage');
})

app.get('/getPoll', function (req, res) {
    res.send(JSON.stringify(pollService.poll));
})

app.post('/setPoll', function (req, res) {
    console.log(req.body);
    /*
    pollService.poll = {
        question: "Thotiana",
        selections: ["A: Bus", "B: Dpwn", "C: Thotiana"],
        answer: 3
    };*/

    //pollService.poll = req.body
    res.send(JSON.stringify(pollService.poll));
})

app.post('/createPoll', function(req, res) {

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))