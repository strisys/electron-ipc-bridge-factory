# Electron IPC Bridge Factory

> A easier way to use [Electron's contextBridge API](https://www.electronjs.org/docs/api/context-bridge)

According to the [Electron documentation](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content) is best *not* to enable Node.js Integration.  The recommendation is to use preload scripts in combination with [Electron's contextBridge API](https://www.electronjs.org/docs/api/context-bridge) for inter-process communication between main and renderer processes.  

Usage is this package is best illustrated in the [provided sample](../sample).  To run:

	> npm install
	> npm start
