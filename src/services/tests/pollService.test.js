var expect = require('chai').expect
const sinon = require('sinon');

var PollService = require('../pollService').PollService;

describe('pollService', () => {
    let pollService;

    beforeEach(() => {
        pollService = new PollService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Test setup', () => {
        it('pollService is created', () => {
            expect(pollService.pollDict).to.be.a('object').that.is.empty;
        });
    });

    describe('generateId', () => {
        it('generates a random ID', () => {
            const id = pollService.generateId();
            expect(id).to.be.a('number').above(0).and.below(1001);
        });
        
        it('doesn\'t generate duplicate IDs', () => {
            // arrange
            pollService.pollDict[5] = {'not': 'null'};
            pollService.pollDict[100] = {'not': 'null'};;

            const randomId = sinon.stub(Math, 'ceil');
            
            // Generate two existing IDs then a new one
            randomId
                .onFirstCall().returns(5)
                .onSecondCall().returns(100);
            randomId.returns(42);

            // assert
            expect(pollService.generateId()).to.equal(42);
        });
    });

    describe('getPoll', () => {
        it('returns null if id or poll doesn\`t exist', () => {
            // arrange
            pollService.pollDict[100] = {has: "no poll property"};

            // assert
            expect(pollService.pollDict[5]).to.be.undefined;
            expect(pollService.getPoll(5)).to.be.null;

            expect(pollService.getPoll(100)).to.be.null;
        });

        it('returns the correct poll', () => {
            // arrange
            const pollA = { poll: {question: 'hello'}, submissions: [0, 0, 0, 1]};
            const pollB = { poll: {question: 'hehe'}, submissions: [0, 1, 0, 1]};
            const pollC = { poll: {question: 'haha'}, submissions: [0, 1, 1, 1]};
            
            pollService.pollDict[200] = pollA;
            pollService.pollDict[312] = pollB;
            pollService.pollDict[696] = pollC;

            // assert
            expect(pollService.getPoll(312)).to.deep.equal({question: 'hehe'});
            expect(pollService.getPoll(696)).to.deep.equal({question: 'haha'});
        });
    });

    describe('createPoll', () => {
        it('correctly creates a new poll', () => {
            // arrange
            const id = 420;
            const pollData = { question: 'hoho' };

            // act
            const res = pollService.createPoll(id, pollData);

            // assert
            expect(res).to.be.true;
            expect(pollService.pollDict[id].poll).to.equal(pollData);
            expect(pollService.pollDict[id].submissions).to.deep.equal([0,0,0,0]);
        });

        it('overwrites an existing poll with the same ID', () => {
            // arrange
            const id = 420;
            const existingPoll = {
                poll: { question: 'haha' },
                submissions: [1, 1, 0, 1]
            };

            pollService.pollDict[id] = existingPoll;
            
            const newPoll = { question: 'hoho' };

            // act
            const res = pollService.createPoll(id, newPoll);

            // assert
            expect(res).to.be.true;
            expect(pollService.pollDict[id]).to.equal(existingPoll);
            expect(pollService.pollDict[id].poll).to.equal(newPoll);
            expect(pollService.pollDict[id].submissions).to.deep.equal([0,0,0,0]);
        });
    });

    describe('deletePoll', () => {
        it('returns false if no poll to delete', () => {
            expect(pollService.deletePoll(5)).to.be.false;
        });

        it('deletes the correct poll', () => {
            // arrange
            pollService.pollDict[100] = {'not': 'null'};
            pollService.pollDict[200] = {'not': 'empty'};
            pollService.pollDict[300] = {'not': 'blank'};

            // act
            const res = pollService.deletePoll(200);

            // assert
            expect(res).to.be.true;
            expect(200 in pollService.pollDict).to.be.false;
        });
    });

    describe('submitAnswer', () => {
        it('returns null if id doesnt exist', () => {
            expect(pollService.submitAnswer(5, 0)).to.be.false;
        });

        it('adds answer to correct poll tally', () => {
            // arrange
            const pollA = { poll: {question: 'hello'}, submissions: [10, 8, 12, 0]};
            const pollB = { poll: {question: 'hehe'}, submissions: [6, 0, 4, 2]};
            
            pollService.pollDict[200] = pollA;
            pollService.pollDict[312] = pollB;

            // act
            const res = pollService.submitAnswer(200, 2);

            // assert
            expect(pollService.pollDict[200].submissions).to.deep.equal([10, 8, 13, 0]);
            expect(pollService.pollDict[312].submissions).to.deep.equal([6, 0, 4, 2]);
        });
    });

    describe('viewSubmissions', () => {
        it('returns null if id doesnt exist', () => {
            expect(pollService.viewSubmissions(5)).to.be.null;
        });

        it('returns submissions for correct poll', () => {
            // arrange
            const pollA = { poll: {question: 'hello'}, submissions: [0, 0, 0, 1]};
            const pollB = { poll: {question: 'hehe'}, submissions: [0, 1, 0, 1]};
            const pollC = { poll: {question: 'haha'}, submissions: [0, 1, 1, 1]};
            
            pollService.pollDict[200] = pollA;
            pollService.pollDict[312] = pollB;
            pollService.pollDict[696] = pollC;

            // act
            const res = pollService.viewSubmissions(312);

            // assert
            expect(res).to.deep.equal([0, 1, 0, 1]);
        });
    });

    describe('clearAll', () => {
        it('clears all polls', () => {
            // arrange
        pollService.pollDict = {'something': 'thats not empty'};
        
        // act
        const res = pollService.clearAll();

        // assert
        expect(res).to.be.true;
        expect(pollService.pollDict).to.be.empty;
        }); 
    });
  });