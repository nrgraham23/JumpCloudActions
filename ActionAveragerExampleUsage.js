const ActionAverager = require('./ActionAverager');

// Actions to add
const action1 = '{"action":"jump", "time":100}';
const action2 = '{"action":"run", "time":75}';
const action3 = '{"action":"jump", "time":200}';

const averager = new ActionAverager();

console.log('Adding action: ' + action1);
averager.addAction(action1);
console.log('Adding action: ' + action2);
averager.addAction(action2);
console.log('Adding action: ' + action3);
averager.addAction(action3);

// Get the stats for the actions added
const stats = averager.getStats();

console.log('Stats are: ' + averager.getStats());
