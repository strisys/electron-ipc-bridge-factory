export declare const create: (name: any, sendWhitelist?: any[], receiveWhitelist?: any[]) => {
    ipc: {
        name: any;
        whitelists: {
            send: any[];
            receive: any[];
        };
        send: (channel: any, data: any) => void;
        receive: (channel: any, fn: any) => void;
    };
};
