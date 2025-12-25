const eventEmitter = require('events');

class AppEventBus extends eventEmitter {}

const eventBus = new AppEventBus();

module.exports = eventBus;