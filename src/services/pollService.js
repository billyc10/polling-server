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

const clearAll = () => {
    poll = {
        question: '',
        selections: [],
        answer: null
    };

    submissions = [0, 0, 0, 0];
}

module.exports = {
    getPoll: getPoll,
    setPoll: setPoll,
    submitAnswer: submitAnswer,
    viewSubmissions: viewSubmissions,
    clearAll: clearAll
}