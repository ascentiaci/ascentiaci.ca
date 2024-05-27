// global-teardown.js
const { stopServer } = require('./serverManager');

module.exports = async () => {
  await stopServer();
};
