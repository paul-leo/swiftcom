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

async function registerServiceWorker() {
    await registerSw('/sw.js');
    try {
        const objFromSw = await importModule();
        console.log(await objFromSw.add(1, 2));
    } catch (error) {
        console.error(error);
    }
}
registerServiceWorker();
