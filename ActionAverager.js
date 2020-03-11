const Action = require('./Action');

/* 
 * This class keeps a map of Action objects and produces the average
 * time spent on each action when the getStats function is called.
 */

class ActionAverager {
    constructor() {
        this.actionMap = {};
    }

    // Adds an action and updates the time spent on pre-existing actions.
    addAction(actionString) {
        const action = JSON.parse(actionString);

        if (typeof this.actionMap[action.action] === 'undefined') {
            this.actionMap[action.action] = new Action(action.action);
        }
        this.actionMap[action.action].numActions += 1;
        this.actionMap[action.action].totalTime += action.time;
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
}

module.exports = ActionAverager;
