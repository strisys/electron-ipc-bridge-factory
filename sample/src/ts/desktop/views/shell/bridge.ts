import { create } from '../../util/bridge-factory';

const sendWhitelist = ['count'], receiveWhitelist = ['app-info'];
create('apis', sendWhitelist, receiveWhitelist);
