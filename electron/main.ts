import { Music } from './entity/music';
import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
import 'reflect-metadata';

import { getManager, EntityManager, Connection, getRepository, createConnection } from 'typeorm';

import { dataBaseService } from './providers/dataBaseService';

console.log(`Current directory: ${process.cwd()}`);
console.log(`This platform is ${process.platform}`);
console.log(`Exec path is ${process.execPath}`);
console.log(`Main module file is ${process.mainModule.filename}`);
console.log(`ELECTRON_DEV is ${process.env.ELECTRON_ENV}`);



/*
try {
  dataBaseService.conect().then(() => {
    console.log('criei');
    dataBaseService.getConnection().getRepository(Music).findOne(1).then((music: Music) => {
      console.log(music);
    });
  });
} catch (e) {
  console.log(e);
}

*/

let mainWindow, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });

  if (serve) {
    require('electron-reload')(__dirname, {
     electron: require(`${__dirname}/../../node_modules/electron`)});
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
