const test = require('ava')
const puppet = require('puppeteer')
const createBrowserGetter = require('.').default
const { Browser } = require('puppeteer/lib/Browser')

const getBrowser = createBrowserGetter(puppet)

test('test', async t => {
    let browser
    await t.notThrowsAsync(() => getBrowser().then(b => (browser = b)))
    t.true(browser instanceof Browser)

    const other1 = await getBrowser()
    t.is(browser, other1)

    await other1.close()
    await browser.close()

    const other2 = await getBrowser()
    t.not(browser, other2)
    t.is(other2, await getBrowser())
})
