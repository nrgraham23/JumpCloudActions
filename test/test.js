var assert = require('assert');
const ActionAverager = require('../ActionAverager');

// test with proper input
describe('HappyCase', function() {
    beforeEach(function() {
        this.actionAverager = new ActionAverager();
    });

    // unit tests for addAction
    describe('#addAction()', function() {
        it('Should be able to create action "jump" with time 0', function() {
            const action1 = '{"action":"jump", "time":0}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
        it('Should be able to create action "jump" with time 10000', function() {
            const action1 = '{"action":"jump", "time":10000}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
        it('Should be able to create action with a single character', function() {
            const action1 = '{"action":"j", "time":10000}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
        it('Should be able to create action with 20 characters', function() {
            const action1 = '{"action":"aLongActionNameWoooo", "time":10000}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
        it('Should be able to create action with lower and upper case letters', function() {
            const action1 = '{"action":"Jump", "time":10000}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
    });
});