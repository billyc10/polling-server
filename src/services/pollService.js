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
    }

    generateId() {
        let id = Math.ceil(Math.random() * 1000);
        // Generate new ID if this one already attached to poll
        while (this.pollDict[id]) {
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
        // Create a PollInstance for new poll, otherwise update fields
        // with new poll data and reset submissions
        if (this.pollDict[id]) {
            this.pollDict[id].poll = pollData;
            this.pollDict[id].submissions = [0, 0, 0, 0];
        } else {
            this.pollDict[id] = new PollInstance(pollData);
        }

        return true;
    }

    deletePoll(id) {
        // Deletes poll with id: id. Returns boolean for success/fail
        if(this.pollDict[id]) {
            delete this.pollDict[id];
            return true;
        } else {
            return false;
        }
    }

    submitAnswer(id, answer) {
        if(this.pollDict[id]) {
            this.pollDict[id].submissions[answer] += 1;
            return true;
        } else {
            return false;
        }
    }

    viewSubmissions(id) {
        if(this.pollDict[id]) {
            return this.pollDict[id].submissions;
        } else {
            return null;
        }
    }

    clearAll() {
        this.pollDict = {};
        return true;
    }
}

module.exports = {
    PollService
}