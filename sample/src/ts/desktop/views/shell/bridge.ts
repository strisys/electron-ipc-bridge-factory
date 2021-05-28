import { create } from '@strisys/electron-ipc-bridge-factory';

const sendWhitelist = ['count'], receiveWhitelist = ['app-info'];
create('apis', sendWhitelist, receiveWhitelist);
