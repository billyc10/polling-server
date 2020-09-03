const express = require('express')
const app = express()
const cors = require('cors');

const pollService = require('./services/pollService.js');
const port = 25565;

// CORS middleware for all routes
app.use(cors())
    
app.get('/', function (req, res) {
    res.send('Polling App API');
})

app.get("/pollStream", (req, res) => {
    // Server Sent Events will periodically send out new polls when made available
    // to clients that have connected to this EventSource and listening for 

    console.log('new request from: ' + req.query.id);
    
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    })
  
    // Function that periodically sends new data to this client
    let eventStream = setInterval(() => {
        console.log(`Event is happening for ${req.query.id}`);
        res.write(`data: ${JSON.stringify(pollService.getPoll())}\n\n`);
    }, 2000)

    // Stop sending responses if client closes connection (closes the page)
    req.on('close', (err) => {
        clearInterval(eventStream);
        res.end();
    })
  })

app.get('/getPoll', function (req, res) {
    // Retrieve the currently active poll
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
    console.log("All data flushed");
    
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