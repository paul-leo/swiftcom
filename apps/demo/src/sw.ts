// @ts-ignore
import { swifcomExport } from 'swiftcom/dist/worker.js';
self.addEventListener('install', (event) => {
    console.log('install');
    self.skipWaiting();
});

swifcomExport({
    add(a = 0, b = 0) {
        return a + b;
    },
});
