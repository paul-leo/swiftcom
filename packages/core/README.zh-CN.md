# Swiftcom 🚀 — 让ServiceWorker通信和调用函数一样简单
[![github](https://img.shields.io/github/stars/paul-leo/swiftcom)]()
[![npm](https://img.shields.io/npm/v/swiftcom)](https://www.npmjs.com/package/swiftcom)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/swiftcom)](https://www.npmjs.com/package/swiftcom)
----------------
[中文](./README.zh-CN.md) | [English](./README.md)

Swiftcom 让 ServiceWorker 的开发体验变得更加友好。它是一个轻量级库，你无需关心复杂的postMessage，简化了使用 ServiceWorker 时的复杂性。它让主线程和服务工作线程之间的通信变得像调用函数一样简单。

## 速览
[![take a look](https://github.com/paul-leo/swiftcom/raw/main/docs/demo.jpg)](https://github.com/paul-leo/swiftcom)

# 快速开始
## 安装
```bash
npm install swiftcom
```

### ServiceWorker 代码
```javascript
// @ts-ignore
import { swifcomExport } from 'swiftcom/dist/worker.js';

swifcomExport({
    add(a = 0, b = 0) {
        return a + b;
    },
});

```
### 主进程代码
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
如果还可以不放 Star 一下 🎉