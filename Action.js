/*
 * This is a container class for Actions.  It tracks the name
 * of each action, the total time spent on the action, and the
 * number of actions performed so far for the purpose of calculating
 * averages.
 */

class Action {
    constructor(action) {
        this.action = action;
        this.totalTime = 0;
        this.numActions = 0;
    }
}

module.exports = Action;
