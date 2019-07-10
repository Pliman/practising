module.exports = (function(settings) {
    settings.test_workers = false

    // 根据平台设置webdriver路径
    settings.webdriver.server_path = `./bin/${process.platform}/chromedriver`

    // 使用headless模式
    // settings.test_settings.default.desiredCapabilities.chromeOptions = {
    //     "args": [
    //         "--headless"
    //     ],
    //     "binary": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    // }

    return settings;
})(require('./nightwatch.json'))
