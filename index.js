'use strict'

module.exports = createBrowserGetter
module.exports.default = createBrowserGetter
module.exports.createBrowserGetter = createBrowserGetter

function createBrowserGetter (puppet, opts = {}) {
    let pBrowser
    let calls = 0
    return () => {
        calls++
        if (!pBrowser) {
            pBrowser = puppet.launch(opts).then(browser => {
                const close = browser.close
                browser.close = () => {
                    if (calls === 0 || --calls > 0) return Promise.resolve()

                    pBrowser = null
                    return close.call(browser)
                }
                return browser
            })
        }
        return pBrowser
    }
}
