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
        if(!name) {
            throw new Error('module name is required');
        }
        if (Swifcom._modules[name]) {
            throw new Error(`module ${name} has been exported`);
        }
        if (typeof obj !== 'object') {
            throw new Error('module must be an object');
        }
        this._init();
        Swifcom._modules[name] = obj;
    };
    // 监听远程调用
    private static _listenRemoteCall() {
        self.addEventListener('message', async (event) => {
            const { type, data, port } = event.data;
            switch (type) {
                case remoteMessageType:
                    const { funName, moduleName = 'default' } = data;
                    const method = (Swifcom._modules as any)?.[moduleName]?.[funName];
                    if (method) {
                        const methodRes =
                            typeof method === 'function'
                                ? await method(data)
                                : method;
                        port.postMessage({
                            type: callbackMessageType,
                            data: methodRes,
                        });
                    }
                    else {
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
