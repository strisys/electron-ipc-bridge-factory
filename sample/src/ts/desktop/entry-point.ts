import { app } from 'electron';
import { init } from './views/shell/main';
import { createLogger } from './util/logger';

const logger = createLogger('entry-point');

app.on('ready', () => {
  logger.info('starting shell ...');
  init();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    logger.info(`closing application ...`);
    app.quit();
  }
});