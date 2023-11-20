// index.js
// index.js
if (typeof atob === 'undefined') {
    global.atob = (str) => Buffer.from(str, 'base64').toString('binary');
  }

import { AppRegistry } from 'react-native';
import App from './App'; 
import { name as appName } from './app.json';
import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}


AppRegistry.registerComponent('main', () => App);
