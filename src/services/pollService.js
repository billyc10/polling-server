var pollInstance = {
    poll: {
        question: '',
        selections: [],
        answer: ''
    },
    submissions: [0, 0, 0, 0]
};

/* Getters and setters */

const getPoll = () => {
    return pollInstance.poll;
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
    getPoll: getPoll,
    setPoll: setPoll,
    submitAnswer: submitAnswer,
    viewSubmissions: viewSubmissions,
    clearAll: clearAll
}