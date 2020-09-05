const express = require('express')
const app = express()
const cors = require('cors');

const PollService = require('./services/pollService').PollService;
const pollService = new PollService();

const PORT = 5000;

// CORS middleware for all routes
app.use(cors())
    
app.get('/', function (req, res) {
    res.send('Polling App API');
})

app.get("/pollStream", (req, res) => {
    // Server-Sent Event: Periodically send out poll to clients
    // that have connected to this stream with an eventSource
    if(req.query.id in pollService.pollDict) {
        res.set({
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive"
          })
        
          // Function that periodically sends new data to this client
          let eventStream = setInterval(() => {
              res.write(`data: ${JSON.stringify(pollService.getPoll(req.query.id))}\n\n`);
          }, 2000)
      
          // Stop sending responses if client closes connection (closes the page)
          req.on('close', () => {
              clearInterval(eventStream);
              res.end();
          })
      
          // Send initial data
          res.write(`data: ${JSON.stringify(pollService.getPoll(req.query.id))}\n\n`);
    } else {
        res.status(400).send('Invalid ID');
    }
})

app.get("/reponseStream", (req, res) => {
    // Server-Sent Event: Periodically send out poll responses to clients
    // that have connected to this stream with an eventSource
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    })
  
    // Function that periodically sends new data to this client
    let eventStream = setInterval(() => {
        res.write(`data: ${JSON.stringify(pollService.viewSubmissions(req.query.id))}\n\n`);
    }, 1000)

    // Stop sending responses if client closes connection (closes the page)
    req.on('close', () => {
        clearInterval(eventStream);
        res.end();
    })

    // Send initial data
    res.write(`data: ${JSON.stringify(pollService.viewSubmissions(req.query.id))}\n\n`);
})

app.get('/createRoom', function (req, res) {
    // Creates a room (adds KVP (id: empty poll) in pollDict)
    // returns ID to client
    const id = pollService.generateId();
    
    if (pollService.createPoll(id, null)){
        res.status(200).send(JSON.stringify(id));
    } else {
        res.sendStatus(500);
    }
});

app.post('/createPoll', express.json(), function (req, res) {
    // Update/set the current poll
    if(pollService.createPoll(req.body.id, req.body.poll)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
})

app.get('/connectRoom', function (req, res) {
    // Allows client to query if room ID exists to connect to
    if(req.query.id in pollService.pollDict) {
        res.sendStatus(200);
    } else {
        res.status(400).send('Invalid ID');
    }
})

app.get('/getPoll', function (req, res) {
    // Retrieve the currently active poll
    res.send(JSON.stringify(pollService.getPoll(req.query.id)));
})

app.post('/clearAll', function (req, res) {
    // Flush API
    if(pollService.clearAll()) {
        // Reset API variables
        console.log("All data flushed");
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
    
})

app.post('/submitAnswer', express.json(), function (req, res) {
    // Add an answer to the submissions tally
    if(pollService.submitAnswer(req.body["id"], req.body["answer"])) {
        res.sendStatus(200);
    } else {
        res.status(400).send("Invalid ID");
    }
    
})

app.listen(PORT, () => console.log(`Polling server listening on port ${PORT}!`))