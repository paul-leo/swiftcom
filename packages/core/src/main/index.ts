import { remoteMessageType, callbackMessageType } from '../contants/index';
const maxTimeout = 2000;
let currentWorker: ServiceWorker | null = null;

export function importModule(moduleName: string) {
    return new Promise((resolve, reject) => {
        // 监测当前是否有serviceWorker
        console.log('navigator', navigator?.serviceWorker);
        if(navigator?.serviceWorker?.ready){
          console.log('wait serviceWorker is ready');
          navigator?.serviceWorker?.ready.then(() => {
            console.log('serviceWorker is ready');
            resolve(createProxy(moduleName));
          });
          return;
        }
        if (!navigator?.serviceWorker?.controller) {
            reject(new Error('serviceWorker is not exist'));
            return;
        }
        currentWorker = navigator.serviceWorker.controller;
        const channel = new MessageChannel();
        const timer = setTimeout(() => {
            reject(new Error('importModule timeout'));
        }, maxTimeout);
        channel.port1.onmessage = (event) => {
            clearTimeout(timer);
            const { type, data } = event.data;
            if (type === 'swifcom-import') {
                resolve(createProxy(moduleName));
            } else {
                reject(new Error('unknow type'));
            }
        };
        currentWorker?.postMessage(
            {
                type: 'swifcom-import',
                data: {
                    moduleName,
                },
            },
            [channel.port2]
        );
    });
}

function createProxy(moduleName: string) {
    return new Proxy({} as any, {
        get: (target, prop) => {
          if(prop === 'then'){
            return undefined;
          }
            return (...params: any[]) => {
              console.log('get', prop,moduleName,params);
                return getResFromRemote(moduleName, prop.toString(), params);
            };
        },
        set: (target, prop, value) => {
            throw new Error('can not set value');
        },
    });
}

function getWorker() {
    // TODO 需要监听当前的serviceWorker是否发生变化
    // if (!navigator?.serviceWorker?.controller) {
    //     return null;
    // }
    // if (currentWorker !== navigator.serviceWorker.controller) {
    //     return null;
    // }

    return navigator.serviceWorker.controller;
}

function getResFromRemote(moduleName: string, funName: string, params: object) {
    return new Promise((resolve, reject) => {
        const channel = new MessageChannel();
        const timer = setTimeout(() => {
            reject(new Error('getResFromRemote timeout'));
        }, maxTimeout);
        channel.port1.onmessage = (event) => {
            timer && clearTimeout(timer);
            const { type, data } = event.data;
            if (type === callbackMessageType) {
                const { error, res } = data;
                if (error) {
                    reject(error);
                } else {
                    resolve(res);
                }
            } else {
                reject(new Error('unknow type'));
            }
        };
        if(!navigator.serviceWorker.controller){
          return reject(new Error('serviceWorker is not exist'));
        }
        navigator.serviceWorker.controller.postMessage(
            {
                type: remoteMessageType,
                data: {
                    funName,
                    moduleName,
                    params,
                },
            },
            [channel.port2]
        );
    });
}
let _sw: ServiceWorkerRegistration | null = null;
export async function registerSw(swPath: string, options:any = {}): Promise<void> {
    if ('serviceWorker' in navigator) {
        try {
            _sw = await navigator.serviceWorker.register(swPath, options);
            console.log('Service Worker registered successfully.');

            // 确保 Service Worker 已激活
            if (_sw.active) {
                console.log('Service Worker is already active.');
            } else {
                await new Promise<void>((resolve) => {
                    if (_sw) {
                        _sw.addEventListener('updatefound', () => {
                            const newWorker = _sw!.installing;
                            newWorker?.addEventListener('statechange', () => {
                                if (newWorker.state === 'activated') {
                                    console.log('Service Worker activated.');
                                    resolve();
                                }
                            });
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    } else {
        throw new Error('Service Workers are not supported in this browser.');
    }
}
