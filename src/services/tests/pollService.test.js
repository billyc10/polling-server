var expect = require('chai').expect
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

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
            expect(pollService.ids).to.be.a('object').that.is.empty;
            expect(pollService.ids).to.be.a('object').that.is.empty;
        });
    });

    describe('generateId', () => {
        it('generates a random ID', () => {
            let id = pollService.generateId();
            expect(id).to.be.a('number').above(0).and.below(1001);
        });
        
        it.only('doesnt generate duplicate IDs', () => {
            pollService.ids[5] = true;
            pollService.ids[100] = true;

            let randomId = sinon.stub(Math, 'ceil');
            
            // Generate two existing IDs then a new one
            randomId
                .onFirstCall().returns(5)
                .onSecondCall().returns(100);
            randomId.returns(42);

            expect(pollService.generateId()).to.equal(42);
        });

        it.only('restores stub', () => {
            expect(pollService.ids[5]).to.be.undefined;
            pollService.generateId();
        });
    });


  });