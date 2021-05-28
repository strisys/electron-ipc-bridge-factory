import { contextBridge, ipcRenderer } from 'electron';

export const create = (name: string, sendWhitelist: string[] = [], receiveWhitelist: string[] = []): any => {
  const sendWL = (sendWhitelist || []);
  const recWL = (receiveWhitelist || []);

  const api = {
    ipc: {
      name: name,
      whitelists: {
        send: sendWL,
        receive: recWL
      },
      send: (channel: string, data: any) => {   
          const chan = (channel || '').trim();
        
          if (!sendWL.includes(chan)) {
            console.error(`Renderer failed to send data.  The specified send channel [${chan}] is not whitelisted.`);
            return;
          }

          console.log(`Renderer sending data [${data || 'null'}] on channel [${chan}]`, data);
          ipcRenderer.send(chan, data);
      },
      receive: (channel: string, fn: any) => {
        if (typeof(fn) !== 'function') {
          throw new Error(`Failed received data on the specified channel (${channel}).  The specified function paramter is not a function.`)
        }

        const chan = (channel || '').trim();

        if (!recWL.includes(chan)) {
          console.error(`Renderer failed to receive data.  The specified receive channel [${chan}] is not whitelisted.`);
          return;
        }

        ipcRenderer.on(chan, (event, ...args) => {
          console.log(`Renderer receiving data on channel '${chan}'`, args);
          fn(event, ...args)
        });
      }
    },
  };

  contextBridge.exposeInMainWorld(name, api);
  console.log(`An API bridge named '${name}' has been established between the main and render processes!`, api);

  return api;
}
