"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const electron_1 = require("electron");
const create = (name, sendWhitelist = [], receiveWhitelist = []) => {
    const sendWL = (sendWhitelist || []);
    const recWL = (receiveWhitelist || []);
    const api = {
        ipc: {
            name: name,
            whitelists: {
                send: sendWL,
                receive: recWL
            },
            send: (channel, data) => {
                const chan = (channel || '').trim();
                if (!sendWL.includes(chan)) {
                    console.error(`Renderer failed to send data.  The specified send channel [${chan}] is not whitelisted.`);
                    return;
                }
                console.log(`Renderer sending data [${data || 'null'}] on channel [${chan}]`, data);
                electron_1.ipcRenderer.send(chan, data);
            },
            receive: (channel, fn) => {
                const chan = (channel || '').trim();
                if (!recWL.includes(chan)) {
                    console.error(`Renderer failed to receive data.  The specified receive channel [${chan}] is not whitelisted.`);
                    return;
                }
                electron_1.ipcRenderer.on(chan, (event, ...args) => {
                    console.log(`Renderer receiving data on channel '${chan}'`, args);
                    fn(event, ...args);
                });
            }
        },
    };
    electron_1.contextBridge.exposeInMainWorld(name, api);
    console.log(`An API bridge named '${name}' has been established between the main and render processes!`, api);
    return api;
};
exports.create = create;
//# sourceMappingURL=bridge-factory.js.map