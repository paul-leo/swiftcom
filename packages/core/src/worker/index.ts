// 运行在worker 中
import { remoteMessageType, callbackMessageType } from '../contants/index';

export class Swifcom {
    constructor() {
        Swifcom._init();
    }
    private static _isInit = false;
    private static _init = () => {
        if (Swifcom._isInit) return;
        Swifcom._isInit = true;
        Swifcom._listenRemoteCall();
    };
    private static _modules: {
        [key: string]: Object;
    } = {};
    /**
     * 导出模块
     * @param obj
     * @param name
     */
    public static export = (obj: Object, name = 'default') => {
        if (!name) {
            throw new Error('module name is required');
        }
        if (Swifcom._modules[name]) {
            throw new Error(`module ${name} has been exported`);
        }
        if (typeof obj !== 'object') {
            throw new Error('module must be an object');
        }
        Swifcom._init();
        Swifcom._modules[name] = obj;
        console.log('export', obj);
    };
    // 监听远程调用
    private static _listenRemoteCall() {
        console.log('listenRemoteCall');
        self.addEventListener('message', async (event) => {
            console.log('message', event);
            const { type, data } = event.data;
            const port = event.ports[0];
            console.log('message', event);
            switch (type) {
                case remoteMessageType:
                    const {
                        funName,
                        moduleName = 'default',
                        params = {},
                    } = data;
                    const method = (Swifcom._modules as any)?.[moduleName]?.[
                        funName
                    ];
                    if (method) {
                        const methodRes =
                            typeof method === 'function'
                                ? await method(...params)
                                : method;
                        port.postMessage({
                            type: callbackMessageType,
                            data: {
                                res: methodRes,
                            },
                        });
                    } else {
                        port.postMessage({
                            type: callbackMessageType,
                            data: {
                                error: `module ${moduleName} or method ${funName} not found`,
                            },
                        });
                    }
                    break;
            }
        });
    }
}

export function swifcomExport(obj: Object, name = 'default') {
    Swifcom.export(obj, name);
}
