// serverManager.js
const { exec } = require('child_process');

let serverProcess;

function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = exec('npm run lazystart', (error, stdout, stderr) => {
      if (error) {
        reject(`Server start error: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
    serverProcess.stdout.on('data', (data) => {
      if (data.includes('Server is running')) {
        resolve();
      }
    });
  });
}

function stopServer() {
  return new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
      serverProcess.on('exit', resolve);
    } else {
      resolve();
    }
  });
}

module.exports = {
  startServer,
  stopServer,
};
