'use strict'

module.exports = createBrowserGetter
module.exports.default = createBrowserGetter
module.exports.createBrowserGetter = createBrowserGetter

function createBrowserGetter (puppet, opts = {}) {
    let debounce = opts.debounce
    delete opts.debounce

    let pBrowser
    let calls = 0
    let closeTimer = null
    let prevCloseResolver = null

    return () => {
        calls++

        if (closeTimer) {
            prevCloseResolver()
            clearTimeout(closeTimer)
            closeTimer = null
            prevCloseResolver = null
        }

        if (!pBrowser) {
            pBrowser = puppet.launch(opts).then(browser => {
                const close = browser.close
                browser.close = () => {
                    if (calls === 0 || --calls > 0) return Promise.resolve()

                    if (debounce === 0) {
                        pBrowser = null
                        return close.call(browser)
                    }

                    return new Promise((resolve, reject) => {
                        prevCloseResolver = resolve

                        closeTimer = setTimeout(() => {
                            pBrowser = null
                            closeTimer = null
                            prevCloseResolver = null

                            return close.call(browser).then(resolve, reject)
                        }, debounce)
                    })
                }

                return browser
            })
        }

        return pBrowser
    }
}
