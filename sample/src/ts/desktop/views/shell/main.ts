import { app, ipcMain } from 'electron';
import windowFactory from 'electron-window';
import { createLogger } from '../../util/logger';
import path from 'path';
import is from 'electron-is';

const logger = createLogger('shell');

function createMainWindow () {
  const options = {
    width: 1000,
    height: 800,
    webPreferences: {
      devTools: is.dev(),
      preload: path.join(__dirname, 'bridge.js')
    }
  };

  const mainWindow = windowFactory.createWindow(options);
  mainWindow.title = `Contoso v.${app.getVersion()}`;

  const markupPath = path.resolve(__dirname, 'index.html');

  mainWindow.showUrl(markupPath, null, () => {
    const appInfo = {
      version: app.getVersion(),
      name: app.getName()
    }

    logger.info(`shell window is showing ${JSON.stringify(appInfo)}`);
    mainWindow.webContents.send('app-info', appInfo.version, appInfo.name);
  });

  // https://www.electronjs.org/docs/api/web-contents#contentsopendevtoolsoptions
  if (is.dev()) {
    mainWindow.webContents.openDevTools({
      mode: 'bottom',
      activate: true
    });
  }

  return mainWindow;
}

export const init = (): void => { 
  createMainWindow();
}

ipcMain.on('count', (data) => {
  logger.info(`Message received from renderer (${data})`);
});
