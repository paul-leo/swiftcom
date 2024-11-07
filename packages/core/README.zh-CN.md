# Swiftcom 🚀 — Making ServiceWorker Message as Async
[![npm](https://img.shields.io/npm/v/swiftcom)](https://www.npmjs.com/package/swiftcom)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/swiftcom)](https://www.npmjs.com/package/swiftcom)
----------------
[中文](./README.zh-CN.md) | English

Swiftcom makes ServiceWorker enjoyable. Swiftcom is a tiny library, that removes the mental barrier of thinking about postMessage and hides the fact that you are working with serviceWorker. It makes the communication between the main thread and service worker as simple as calling a function.

## Features


# Let's try it out
## Installation
```bash
npm install swiftcom
```

## Usage
### In ServiceWorker
```javascript
// @ts-ignore
import { swifcomExport } from 'swiftcom/dist/worker.js';

swifcomExport({
    add(a = 0, b = 0) {
        return a + b;
    },
});

```
### In Main Thread

```javascript
import { importModule, registerSw } from 'swiftcom/dist/main.js';

// this is main function to initialize service worker
function initSW() {
    // check if service worker is supported
    if ('serviceWorker' in navigator) {
        // please replace '/sw.js' with your service worker file path
        await registerSw('/sw.js');
        try {
            const objFromSw = await importModule();
            // call add function from service worker
            console.log(await objFromSw.add(1, 2));
        } catch (error) {
            console.error(error);
        }
    }
}

initSW();
```

Enjoy! 🎉
