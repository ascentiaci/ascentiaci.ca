// global-setup.js
const { startServer } = require('./serverManager');

module.exports = async () => {
  await startServer();
};
