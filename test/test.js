var assert = require('assert');
const ActionAverager = require('../ActionAverager');

// test with proper input
describe('Happy Case', function() {
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
        it('Should be able to create action with decimal times', function() {
            const action1 = '{"action":"Jump", "time":0.5}';
            assert.doesNotThrow(() => {this.actionAverager.addAction(action1)});
        });
        it('Action names with capitals should be stored lower case', function() {
            const action1 = '{"action":"Jump", "time":0.5}';
            this.actionAverager.addAction(action1);
            assert.ok(typeof this.actionAverager.actionMap['jump'] !== 'undefined');
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
        it('Should average times correctly when decimals are included', function() {
            const action1 = '{"action":"jump", "time":0.5}'
            const action2 = '{"action":"jump", "time":0.5}';
            this.actionAverager.addAction(action1);
            this.actionAverager.addAction(action2);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.equal(result[0].avg, 0.5);
        });
        it('Should combine actions that have the same name but different cases', function() {
            const action1 = '{"action":"jump", "time":0.5}'
            const action2 = '{"action":"JUMP", "time":0.5}';
            this.actionAverager.addAction(action1);
            this.actionAverager.addAction(action2);

            const result = JSON.parse(this.actionAverager.getStats());
            assert.equal(result[0].avg, 0.5);
            assert.ok(result.length === 1);
        });
    });
});

// input validation tests
describe('Invalid Inputs', function() {
    beforeEach(function() {
        this.actionAverager = new ActionAverager();
    });

    // unit tests for addAction
    describe('#addAction()', function() {
        it('Should throw error when adding "undefined"', function() {
            assert.throws(() => {this.actionAverager.addAction(undefined)});
        });
        it('Should throw error when adding "null"', function() {
            assert.throws(() => {this.actionAverager.addAction(null)});
        });
        it('Should throw error when adding empty object', function() {
            assert.throws(() => {this.actionAverager.addAction({})});
        });
        it('Should throw error when adding action with incorrect fields', function() {
            const action1 = '{"actions":"jump", "time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action with only "action"', function() {
            const action1 = '{"action":"jump"}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action with only "time"', function() {
            const action1 = '{"time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action with more than 20 characters', function() {
            const action1 = '{"action":"jumpforareallybigname", "time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action that is an empty string', function() {
            const action1 = '{"action":"", "time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action that is a number', function() {
            const action1 = '{"action":42, "time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action that has illegal characters', function() {
            const action1 = '{"action":"jump-42", "time":100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action with negative time', function() {
            const action1 = '{"action":"jump", "time":-100}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
        it('Should throw error when adding action with time that is a string', function() {
            const action1 = '{"action":"jump", "time":"100"}';
            assert.throws(() => {this.actionAverager.addAction(action1)});
        });
    });
});