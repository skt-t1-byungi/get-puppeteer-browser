const test = require('ava')
const puppet = require('puppeteer')
const createBrowserGetter = require('.').default
const { Browser } = require('puppeteer/lib/Browser')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

test('test', async t => {
    const getBrowser = createBrowserGetter(puppet)

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

test('avoid closing multiple times', async t => {
    const getBrowser = createBrowserGetter(puppet)
    const tmp = await getBrowser()
    await tmp.close()
    tmp.close() // no await
    t.is(await getBrowser(), await getBrowser())
})

test('debounce close', async t => {
    t.plan(4)
    const getBrowser = createBrowserGetter(puppet, { debounce: 200 })
    const browser = await getBrowser()
    browser.close().then(() => t.pass())
    await delay(190)
    const other1 = await getBrowser()
    t.is(browser, other1)
    other1.close().then(() => t.pass())
    await delay(210)
    const other2 = await getBrowser()
    t.not(browser, other2)
})
