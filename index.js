'use strict'

module.exports = createBrowserGetter
module.exports.default = createBrowserGetter

function createBrowserGetter (puppet, opts = {}) {
    let pBrowser
    let calls = 0
    return () => {
        calls++
        if (!pBrowser) {
            pBrowser = puppet.launch(opts).then(browser => {
                const close = browser.close.bind(browser)
                browser.close = () => {
                    if (calls === 0 || --calls > 0) return Promise.resolve()
                    pBrowser = null
                    return new Promise((resolve, reject) => {
                        process.nextTick(() => {
                            if (calls > 0) return resolve()
                            close().then(resolve, reject)
                        })
                    })
                }
                return browser
            })
        }
        return pBrowser
    }
}
