# Electron IPC Bridge Factory

> A easier way to use [Electron's contextBridge API](https://www.electronjs.org/docs/api/context-bridge)

According to the [Electron documentation](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) is best *not* to enable Node.js Integration.  The recommendation is to use preload scripts in combination with [Electron's contextBridge API](https://www.electronjs.org/docs/api/context-bridge) for inter-process communication between main and renderer processes.  

### [NPM Package](https://www.npmjs.com/package/electron-ipc-bridge-factory)

	> npm install electron-ipc-bridge-factory

### [Sample](./sample)

Usage is this package is best illustrated in the [provided sample](./sample).  To run:

	> git clone https://github.com/strisys/electron-ipc-bridge-factory
	> cd cd electron-ipc-bridge-factory/sample
	> npm install
	> npm start

The sample shows the usage of this package in a [preload script](./sample/src/ts/desktop/views/shell/bridge.ts) along with IPC from both the [renderer](./sample/src/ts/desktop/views/shell/code-behind.ts) and [main](./sample/src/ts/desktop/views/shell/main.ts) processes.