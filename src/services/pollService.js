var pollInstance = {
    poll: {
        question: '',
        selections: [],
        answer: ''
    },
    new: false
}

var submissions = [0, 0, 0, 0];

/* Getters and setters */

const newPollAvailable = () => {
    if (pollInstance.new) {
        pollInstance.new = false;
        return true;
    } else {
        return false;
    }
    
}

const getPoll = () => {
    return pollInstance.poll;
}

const setPoll = (pollData) => {
    pollInstance.poll = pollData;
    pollInstance.new = true;
    console.log('new is: ' + pollInstance.new);
}

const submitAnswer = (answer) => {
    submissions[answer] += 1;
}

const viewSubmissions = () => {
    return submissions;
}

const clearAll = () => {
    pollInstance = {
        poll: {
            question: '',
            selections: [],
            answer: ''
        },
        new: false
    }

    submissions = [0, 0, 0, 0];
}

module.exports = {
    newPollAvailable: newPollAvailable,
    getPoll: getPoll,
    setPoll: setPoll,
    submitAnswer: submitAnswer,
    viewSubmissions: viewSubmissions,
    clearAll: clearAll
}