# get-puppeteer-browser
> Get a singleton puppeteer browser instance.

[![npm](https://flat.badgen.net/npm/v/get-puppeteer-browser)](https://www.npmjs.com/package/get-puppeteer-browser)
[![license](https://flat.badgen.net/github/license/skt-t1-byungi/get-puppeteer-browser)](https://github.com/skt-t1-byungi/get-puppeteer-browser/blob/master/LICENSE)

Creating a puppeteer browser instance is very slow. It is usually better to reuse than to create each time.

## Install
```sh
npm i get-puppeteer-browser
```

## Example
```js
const createBrowserGetter = require('get-puppeteer-browser')
const puppeteer = require('puppeteer')

const getBrowser = createBrowserGetter(puppeteer, {headless: true, devtools: true});

(async () => {
    const b1 = await getBrowser()
    const b2 = await getBrowser()

    console.log(b1 === b2) // => true

    await b1.close() // Not yet closed
    await b2.close() // Close now.
})()
```

## API
### createBrowserGetter(puppeteer[, launchOptions])
Create a `getBrowser` function.

#### Debounce option
Debounce without closing immediately.

```js
const getBrowser = createBrowserGetter(puppeteer, {debounce: 1000});

(async () => {
    const b1 = await getBrowser()
    b1.close()

    delay(900).then(async () => {
        const b2 = await getBrowser()
        console.log(b1 === b2) // => true
        b2.close()

        delay(1000).then(async () => {
            const b3 = await getBrowser()
            console.log(b2 === b3) // => false
        })
    })
})()
```


## License
MIT
