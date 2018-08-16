import { Injectable } from '@angular/core';

/*
  Em Angular 6, não é possível compilar um projeto Angular que contenham módulos node nativos
  porque não é possível customizar o script de compilação webpack do Angular, como era possível
  nas versões anteriores. Então, algumas partes deste script foram alteradas como solução de contorno.
  A outra parte da solução de contorno está no arquivo index.html.
*/

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.

// Os 3 imports abaixo foram comentados como parte da solução de contorno.
// import { ipcRenderer, webFrame, remote } from 'electron';
// import * as childProcess from 'child_process';
// import * as fs from 'fs';

declare var electron: any;
declare var childProcess: any;
declare var fs: any;

@Injectable()
export class ElectronService {

  // As referencias abaixo foram alteradas para referenciar as variáveis globais importadas
  // no index.html
  // ipcRenderer: typeof ipcRenderer;
  // webFrame: typeof webFrame;
  // remote: typeof remote;
  // childProcess: typeof childProcess;
  // fs: typeof fs;
   ipcRenderer: typeof electron.ipcRenderer;
   webFrame: typeof electron.webFrame;
   remote: typeof electron.remote;
   childProcess: typeof childProcess.childProcess;
   fs: typeof fs.fs;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
