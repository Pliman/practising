const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
  client
} = require('nightwatch-api');

async function setup(options) {
  await startWebDriver(options);
  await createSession();
}

async function shutdown() {
  await closeSession();
  await stopWebDriver();
  process.exit();
}

async function run() {
  await client.url('https://baidu.com/');
  let title;
  await client.getTitle(t => (title = t));
  await client.assert.title('百度一下，你就知道');
}

(async function() {
  try {
    await setup({ env: process.env.NIGHTWATCH_ENV || 'chromeHeadless' });
    await run();
  } catch (err) {
    console.log(err.stack);
    process.exitCode = 1;
  } finally {
    await shutdown();
  }
})();
