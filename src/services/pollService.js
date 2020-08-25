var poll = {
    question: '',
    selections: [],
    answer: null
};

var submissions = [0, 0, 0, 0];

/* Getters and setters */

const getPoll = () => {
    return poll;
}

const setPoll = (pollData) => {
    poll = pollData;
}

const submitAnswer = (answer) => {
    submissions[answer] += 1;
}

const viewSubmissions = () => {
    return submissions;
}

module.exports = {
    getPoll: getPoll,
    setPoll: setPoll,
    submitAnswer: submitAnswer,
    viewSubmissions: viewSubmissions
}