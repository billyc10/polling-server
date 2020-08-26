const express = require('express')
const app = express()
const cors = require('cors');

const pollService = require('./services/pollService.js');
const port = 25565;

// CORS middleware for all routes
app.use(cors())
    
app.get('/', function (req, res) {
    res.send('Welcome to the Homepage');
})

app.get('/getPoll', function (req, res) {
    // Retrieve the current poll
    res.send(JSON.stringify(pollService.getPoll()));
})

app.post('/setPoll', express.json(), function (req, res) {
    // Update/set the current poll
    console.log(req.body);

    pollService.setPoll(req.body);

    res.send(JSON.stringify(pollService.getPoll()));
})

app.post('/clearAll', function (req, res) {
    // Reset API variables
    pollService.clearAll();
    res.send('API flushed');
})

app.post('/submitAnswer', express.json(), function (req, res) {
    // Add an answer to the submissions tally
    pollService.submitAnswer(req.body["answer"]);
    res.send(JSON.stringify(req.body));

    console.log("Submissions: " + pollService.viewSubmissions());
})

app.listen(port, () => console.log(`Polling server listening on port ${port}!`))