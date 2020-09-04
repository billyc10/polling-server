class PollInstance {
    constructor(poll) {
        this.poll = poll;
        this.submissions = [0, 0, 0, 0];
    }
}

class PollService {
    constructor() {
        // Use objects as lookup tables for polls and IDs
        this.pollDict = {};
        this.ids = {};
    }

    generateId() {
        let id = Math.ceil(Math.random() * 1000);
        // Generate new ID if already exists in ID table
        while (this.ids[id]) {
            id = Math.ceil(Math.random() * 1000);
        }
        return id
    }

    getPoll(id) {
        // Retrieve poll from dictionary by ID if it exists
        if (this.pollDict[id] && this.pollDict[id].poll) {
            return this.pollDict[id].poll;
        } else {
            return null;
        }
    }

    createPoll(id, pollData) {

        this.pollDict[id] = new PollInstance(pollData);
    }
}

const setPoll = (pollData) => {
    pollInstance.poll = pollData;
    pollInstance.submissions = [0, 0, 0, 0];
    console.log('poll has been set. read to send: ' + !pollInstance.sent);
}

const submitAnswer = (answer) => {
    pollInstance.submissions[answer] += 1;
}

const viewSubmissions = () => {
    return pollInstance.submissions;
}

const clearAll = () => {
    pollInstance = {
        poll: {
            question: '',
            selections: [],
            answer: ''
        },
        submissions: [0, 0, 0, 0]
    }
}

module.exports = {
    PollService
}