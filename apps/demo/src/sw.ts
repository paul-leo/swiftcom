// @ts-ignore
import { swifcomExport } from 'swiftcom/dist/worker.js';
self.addEventListener('install', (event) => {
    console.log('install');
    self.skipWaiting();
});

swifcomExport({
    test() {
        return 'test';
    },
});
