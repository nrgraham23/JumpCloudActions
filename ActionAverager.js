const ajv = require('ajv');
const Action = require('./Action');
const schema = require('./schema');

/* 
 * This class keeps a map of Action objects and produces the average
 * time spent on each action when the getStats function is called.
 */

class ActionAverager {
    constructor() {
        this.actionMap = {};
        this.ajv = new ajv();

        this.validate = this.ajv.compile(schema);
    }

    // Adds an action and updates the time spent on pre-existing actions.
    addAction(actionString) {
        const action = this._parseAction(actionString);
        const actionName = action.action.toLowerCase();

        if (typeof this.actionMap[actionName] === 'undefined') {
            this.actionMap[actionName] = new Action(actionName);
        }
        this.actionMap[actionName].numActions += 1;
        this.actionMap[actionName].totalTime += action.time;
    }

    // Produces the average time spent on each action.
    getStats() {
        const stats = [];

        Object.keys(this.actionMap).forEach(action => {
            const average = this._calcAverage(this.actionMap[action]);
            stats.push({
                action: this.actionMap[action].action,
                avg: average
            });
        });

        return JSON.stringify(stats);
    }

    _calcAverage(action) {
        if (action.numActions > 0) {
            return action.totalTime / action.numActions;
        }
        return 0;
    }

    // returns a parsed action or throws an error if the action is
    // not properly formatted
    _parseAction(actionString) {
        let action;
        if (typeof actionString === 'string') {
            try {
                action = JSON.parse(actionString);
            } catch (e) {
                throw new Error('Unable to parse action: ' + e);
            }
        }
        if (!this.validate(action)) {
            throw new Error('Invalid action object: ' +
                JSON.stringify(this.validate.errors));
        }
        return action;
    }
}

module.exports = ActionAverager;
