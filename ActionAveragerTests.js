const ActionAverager = require('./ActionAverager');

const action1 = '{"action":"jump", "time":100}';
const action2 = '{"action":"run", "time":75}';
const action3 = '{"action":"jump", "time":200}';

const averager = new ActionAverager();

averager.addAction(action1);
averager.addAction(action2);
averager.addAction(action3);

console.log('Stats are: ' + averager.getStats());
