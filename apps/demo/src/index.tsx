import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// @ts-ignore
import { importModule, registerSw } from 'swiftcom/dist/main.js';

const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async () => {
            await registerSw('/sw.js');
            console.log('Service Worker registered successfully.');
            const objFromSw = await importModule();
            console.log(objFromSw);
            console.log(await objFromSw.test());
        });
    }
}
registerServiceWorker();
