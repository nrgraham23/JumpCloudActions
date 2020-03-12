var assert = require('assert');
const ActionAverager = require('../ActionAverager');

// test with proper input
describe('HappyCase', function() {
    beforeEach(function() {
        this.actionAverager = new ActionAverager();
        this.jump0 = '{"action":"jump", "time":0}';
    });

    // unit tests for addAction
    describe('#addAction()', function() {
        it('Should be able to create action "jump" with time 0', function() {
            assert.doesNotThrow(() => {this.actionAverager.addAction(this.jump0)});
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
    // tests for get stats
    describe('#getStats()', function() {
        it('Should return json serialized string', function() {
            this.actionAverager.addAction(this.jump0);

            const result = this.actionAverager.getStats();
            assert.equal(typeof result, 'string');
            assert.doesNotThrow(() => {JSON.parse(result)})
        });
        it('Should return array of objects as a json serialized string', function() {
            this.actionAverager.addAction(this.jump0);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.ok(Array.isArray(result));
            assert.equal(typeof result[0], 'object');
            assert.ok(!Array.isArray(result[0]));
        });
        it('Should handle actions with 0 time', function() {
            this.actionAverager.addAction(this.jump0);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.equal(result[0].avg, 0);
        });
        it('Should average times correctly for a single action', function() {
            const action2 = '{"action":"jump", "time":100}';
            this.actionAverager.addAction(this.jump0);
            this.actionAverager.addAction(action2);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.equal(result[0].avg, 50);
        });
        it('Should average times correctly for multiple actions', function() {
            const action1 = '{"action":"jump", "time":100}';
            const action2 = '{"action":"run", "time":75}';
            const action3 = '{"action":"jump", "time":200}';
            this.actionAverager.addAction(action1);
            this.actionAverager.addAction(action2);
            this.actionAverager.addAction(action3);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.equal(result[0].avg, 150);
            assert.equal(result[1].avg, 75);
        });
    });
});