// @ts-ignore
import { swifcomExport } from 'swiftcom/dist/worker.js';
self.addEventListener('install', () => {
    console.log('install');
    // @ts-ignore
    self.skipWaiting();
});

swifcomExport({
    add(a = 0, b = 0) {
        return a + b;
    },
});
